import { NextRequest, NextResponse } from "next/server";
import { CoreMessage, generateText } from "ai";
import { google } from "@ai-sdk/google";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// --- Post Cache Logic ---
const postsCachePath = path.join(process.cwd(), ".posts.cache.json");
let postsCache: Record<string, string> | null = null;

async function loadCache() {
  if (postsCache) return;
  try {
    const data = await fs.readFile(postsCachePath, "utf8");
    postsCache = JSON.parse(data);
    console.log("✅ API Route: Posts cache loaded successfully.");
  } catch {
    console.warn(
      "API Route: Failed to load posts cache. Will build from source."
    );
    postsCache = null;
  }
}

async function buildCacheFromSource() {
  try {
    const postsDir = path.join(process.cwd(), "src/posts");
    const stat = await fs.stat(postsDir).catch(() => null);
    if (!stat || !stat.isDirectory()) {
      console.warn(`API Route: Posts directory not found at ${postsDir}`);
      return;
    }
    const files = await fs.readdir(postsDir);
    const mdFiles = files.filter((f) => f.endsWith(".md"));
    const built: Record<string, string> = {};
    for (const file of mdFiles) {
      const slug = file.replace(/\.md$/, "").toLowerCase();
      const fileContents = await fs.readFile(path.join(postsDir, file), "utf8");
      const { content } = matter(fileContents);
      built[slug] = content;
    }
    if (Object.keys(built).length > 0) {
      postsCache = built;
      console.log("✅ API Route: Built posts cache from src/posts fallback.");
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("❌ API Route: Failed to build posts cache:", msg);
  }
}

async function getPostsCache() {
  if (!postsCache) await loadCache();
  if (!postsCache) await buildCacheFromSource();
  return postsCache;
}

// --- System Prompt Builders ---

// Step 1: Extract Requirements
function buildExtractRequirementsPrompt() {
  return `ユーザーの入力から、旅行の重要な要素（目的地、期間、興味、予算など）をJSON形式で抽出しなさい。ユーザー入力に明示されていない項目は省略すること。
出力はJSONオブジェクトのみとし、他のテキストは含めないこと。
例:
{
  "destination": "東京",
  "duration": "3日間",
  "interests": "アート、美味しいもの",
  "budget": "指定なし"
}`;
}

// Step 2: Summarize relevant articles
function buildSummarizeArticlesPrompt(requirements: string, articleContent: string) {
  return `あなたはアシスタントです。以下の「旅行の要件」を考慮して、「記事のコンテンツ」から関連情報のみを抽出し、簡潔に要約してください。

### 旅行の要件
${requirements}

### 記事のコンテンツ
${articleContent}

### 指示
- 記事の中から、旅行の要件に合致する場所、アクティビティ、レストラン、交通手段、ヒントなどを具体的に抜き出してください。
- 各情報は箇条書きなどの分かりやすい形式でまとめてください。
- 元の記事にない情報は含めないでください。
- 全体として、後の旅行プラン作成の参考資料となるように、要点をまとめてください。
`;
}

// Step 3: Draft a skeleton itinerary
function buildDraftItineraryPrompt(requirements: string, summarizedKnowledgeBase: string) {
  return `あなたは旅行プランナーです。以下の「旅行の要件」と「情報の要約」を基に、旅行プランの骨子をJSON形式で作成してください。

### 絶対的なルール:
- **出力はJSONのみ:** 会話や挨拶、その他のテキストは一切含めず、指定されたJSONオブジェクトのみを生成してください。
- **スキーマの遵守:** 下記のJSON構造を厳密に守ってください。時間、費用、緯度経度などの詳細情報は**含めないでください**。

---
### 旅行の要件
${requirements}
---
### 情報の要約
${summarizedKnowledgeBase}
---
### JSON出力形式
\`\`\`json
{
  "itinerary": {
    "title": "（例：アートとグルメを巡る東京3日間の旅）",
    "description": "（旅行プランの簡単な説明）",
    "days": [
      {
        "day": 1,
        "title": "（例：上野・浅草エリア散策）",
        "schedule": [
          { "activity": "（例：上野の森美術館でアート鑑賞）" },
          { "activity": "（例：浅草で食べ歩きと浅草寺参拝）" }
        ]
      }
    ]
  }
}
\`\`\`
`;
}


// Step 4: Flesh out details for the final plan
function buildFleshOutDetailsPrompt(draftPlan: string, summarizedKnowledgeBase: string) {
  return `あなたはプロの旅行プランナーです。以下の「旅程の骨子」に詳細情報を追加し、最終的な旅行プランを完成させてください。情報は「参考情報の要約」を基にしてください。

### 絶対的なルール:
- **出力はJSONのみ:** 会話、挨拶、Markdown、その他のテキストは一切含めず、指定されたJSONオブジェクトのみを生成してください。
- **スキーマの遵守:** 下記のJSON構造を**厳密に**守ってください。プロパティの追加や削除、データ型の変更は許可されません。
- **緯度経度の追加:** 各アクティビティの\`location\`には、必ず緯度(latitude)と経度(longitude)を含めてください。不明な場合はおおよその値を推定してください。
- **予算の計算:** 各日の予算(\`days.budget\`)と全体の合計予算(\`itinerary.totalBudget\`, \`budgetSummary.total\`)、カテゴリ別予算(\`budgetSummary.categories\`)を必ず計算して含めてください。
- **自然な文章:** 参考情報を基に、あなた自身の言葉で自然な文章を作成してください。

---
### 旅程の骨子 (Draft Plan)
${draftPlan}
---
### 参考情報の要約 (Summarized Knowledge Base)
${summarizedKnowledgeBase}
---
### JSON出力形式
\`\`\`json
{
  "itinerary": {
    "title": "旅行全体のタイトル",
    "description": "旅行プランの簡単な説明",
    "totalBudget": 123456,
    "days": [
      {
        "day": 1,
        "title": "1日目のテーマやタイトル",
        "budget": 12345,
        "schedule": [
          {
            "time": "HH:MM",
            "activity": "アクティビティ名",
            "details": "アクティビティの詳細説明",
            "cost": 1234,
            "location": {
              "name": "場所の名前",
              "latitude": 35.681236,
              "longitude": 139.767125
            }
          }
        ]
      }
    ]
  },
  "budgetSummary": {
    "total": 123456,
    "categories": [
      { "category": "宿泊費", "amount": 12345 },
      { "category": "食費", "amount": 12345 },
      { "category": "交通費", "amount": 12345 },
      { "category": "観光・アクティビティ", "amount": 12345 }
    ]
  }
}
\`\`\`
`;
}


interface ChatRequestBody {
    messages: CoreMessage[];
    articleSlugs?: string[]; // Made optional as it's not needed for single summary
    articleSlug?: string; // New field for single article summarization
    countryName: string;
    step: 'extract_requirements' | 'summarize_articles' | 'summarize_one_article' | 'draft_itinerary' | 'flesh_out_details';
    previous_data?: string;
    requirementsData?: string; // For draft_itinerary and flesh_out_details
    summarizedKnowledgeBase?: string; // For flesh_out_details
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ChatRequestBody;
  console.log("✅ /api/chat: Received request", { step: body.step, country: body.countryName });

  try {
    const { messages, articleSlugs, articleSlug, step, previous_data, requirementsData, summarizedKnowledgeBase } = body;
    const userMessages = messages.filter((m) => m.role === "user");
    const model = google(process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash-latest");

    switch (step) {
      case 'extract_requirements': {
        console.log("  -> Executing step: extract_requirements");
        const systemPrompt = buildExtractRequirementsPrompt();

        console.log("    - Calling Google AI...");
        const { text } = await generateText({ model, system: systemPrompt, messages: userMessages });
        console.log("    - AI call successful. Returning extracted requirements.");
        return NextResponse.json({ response: text });
      }

      case 'summarize_one_article': {
        console.log("  -> Executing step: summarize_one_article");
        if (!articleSlug || !requirementsData) {
          return NextResponse.json({ error: "Step 'summarize_one_article' requires 'articleSlug' and 'requirementsData'." }, { status: 400 });
        }

        console.log(`    - Summarizing article: ${articleSlug}`);
        const cache = await getPostsCache();
        if (!cache) {
          return NextResponse.json({ error: "Server not ready: Could not load post cache." }, { status: 503 });
        }

        const lowerCasePostsCache = Object.fromEntries(Object.entries(cache).map(([k, v]) => [k.toLowerCase(), v]));
        const articleContent = lowerCasePostsCache[articleSlug.toLowerCase()];

        if (!articleContent) {
          console.error(`    - Article with slug '${articleSlug}' not found in cache.`);
          return NextResponse.json({ error: `Article '${articleSlug}' not found.` }, { status: 404 });
        }

        const systemPrompt = buildSummarizeArticlesPrompt(requirementsData, articleContent);
        console.log("    - Calling Google AI for single article summary...");
        const { text } = await generateText({ model, system: systemPrompt, messages: [{ role: 'user', content: 'Continue.' }] });
        console.log("    - AI call successful. Returning summary.");
        return NextResponse.json({ summary: text });
      }

      case 'summarize_articles': {
        // This case is now disabled and will be removed later.
        // For now, it returns an error to prevent accidental use.
        console.warn("  -> WARNING: Deprecated 'summarize_articles' step was called.");
        return NextResponse.json({ error: "The 'summarize_articles' step is deprecated. Use 'summarize_one_article' instead." }, { status: 410 }); // 410 Gone
      }

      case 'draft_itinerary': {
        console.log("  -> Executing step: draft_itinerary");
        if (!previous_data || !requirementsData) {
            return NextResponse.json({ error: "Step 'draft_itinerary' requires 'previous_data' (summary) and 'requirementsData'."}, { status: 400 });
        }

        const systemPrompt = buildDraftItineraryPrompt(requirementsData, previous_data);
        console.log("    - Calling Google AI for draft itinerary...");
        const { text } = await generateText({ model, system: systemPrompt, messages: [{ role: 'user', content: 'Continue.' }] });
        console.log("    - AI call successful. Returning draft plan.");
        return NextResponse.json({ response: text });
      }

      case 'flesh_out_details': {
        console.log("  -> Executing step: flesh_out_details");
        if (!previous_data || !summarizedKnowledgeBase) {
            return NextResponse.json({ error: "Step 'flesh_out_details' requires 'previous_data' (draft plan) and 'summarizedKnowledgeBase'."}, { status: 400 });
        }

        const systemPrompt = buildFleshOutDetailsPrompt(previous_data, summarizedKnowledgeBase);
        console.log("    - Calling Google AI for final plan generation...");
        const { text } = await generateText({ model, system: systemPrompt, messages: [{ role: 'user', content: 'Continue.' }] });
        console.log("    - AI call successful. Parsing and returning final JSON.");

        try {
          const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
          const jsonString = jsonMatch ? jsonMatch[1] : text;
          const parsedJson = JSON.parse(jsonString);
          return NextResponse.json(parsedJson);
        } catch (e) {
          console.error("❌ API Route: Failed to parse JSON response from AI.", e, "AI Response:", text);
          return NextResponse.json({ error: "AIからの応答が不正なJSON形式でした。" }, { status: 500 });
        }
      }

      default: {
        const exhaustiveCheck: never = step;
        console.error(`  ❌ Error: Invalid step provided: ${exhaustiveCheck}`);
        return NextResponse.json({ error: `Invalid step: ${exhaustiveCheck}` }, { status: 400 });
      }
    }
  } catch (error) {
    console.error("❌ /api/chat: Unhandled error in POST handler.", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}