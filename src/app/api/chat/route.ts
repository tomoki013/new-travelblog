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

// Final Step: Flesh out the plan into JSON
function buildFleshOutPlanJsonPrompt(requirements: string, country: string, kb: string) {
  return `あなたはプロの旅行プランナーです。以下の「旅行の要件」と「ブログ記事からの参考情報」に基づき、**${country}**への旅行プランを**厳格なJSON形式**で作成してください。

### 絶対的なルール:
- **出力はJSONのみ:** 会話、挨拶、Markdown、その他のテキストは一切含めず、指定されたJSONオブジェクトのみを生成してください。
- **スキーマの遵守:** 下記のJSON構造を**厳密に**守ってください。プロパティの追加や削除、データ型の変更は許可されません。
- **緯度経度の追加:** 各アクティビティの\`location\`には、必ず緯度(latitude)と経度(longitude)を含めてください。不明な場合はおおよその値を推定してください。
- **予算の計算:** 各日の予算(\`days.budget\`)と全体の合計予算(\`itinerary.totalBudget\`, \`budgetSummary.total\`)、カテゴリ別予算(\`budgetSummary.categories\`)を必ず計算して含めてください。
- **自然な文章:** ブログ記事を参考にしつつも、あなた自身の言葉で自然な文章を作成してください。コピー＆ペーストは禁止です。

---
### 旅行の要件
${requirements}
---
### ブログ記事からの参考情報
${kb}
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
    articleSlugs: string[];
    countryName: string;
    step: 'extract_requirements' | 'flesh_out_plan_json';
    previous_data?: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ChatRequestBody;
  console.log("✅ /api/chat: Received request", { step: body.step, country: body.countryName });

  try {
    const { messages, articleSlugs, countryName, step, previous_data } = body;
    const userMessages = messages.filter((m) => m.role === "user");

    switch (step) {
      case 'extract_requirements': {
        console.log("  -> Executing step: extract_requirements");
        const systemPrompt = buildExtractRequirementsPrompt();
        const model = google(process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash");

        console.log("    - Calling Google AI...");
        const { text } = await generateText({
          model,
          system: systemPrompt,
          messages: userMessages,
        });
        console.log("    - AI call successful. Returning extracted requirements.");
        return NextResponse.json({ response: text });
      }

      case 'flesh_out_plan_json': {
        console.log("  -> Executing step: flesh_out_plan_json");
        if (!previous_data) {
          console.error("  ❌ Error: 'previous_data' is required for this step.");
          return NextResponse.json({ error: `Step '${step}' requires 'previous_data'.` }, { status: 400 });
        }

        console.log("    - Loading post cache...");
        const cache = await getPostsCache();
        if (!cache) {
          console.error("  ❌ Error: Post cache is not available.");
          return NextResponse.json({ error: "Server not ready: Could not load post cache." }, { status: 503 });
        }
        console.log("    - Post cache loaded successfully.");

        const lowerCasePostsCache: Record<string, string> = {};
        for (const key in cache) {
          lowerCasePostsCache[key.toLowerCase()] = cache[key];
        }

        const articleContents = articleSlugs
          .map((slug) => lowerCasePostsCache[slug.toLowerCase()] || "")
          .filter(Boolean);

        if (articleContents.length === 0) {
            console.error("  ❌ Error: No reference blog posts could be loaded for the given slugs:", articleSlugs);
            return NextResponse.json({ error: "Could not load reference blog posts." }, { status: 400 });
        }
        console.log(`    - Loaded ${articleContents.length} reference articles.`);
        const knowledgeBase = articleContents.join("\n\n---\n\n");

        const systemPrompt = buildFleshOutPlanJsonPrompt(previous_data, countryName, knowledgeBase);
        const model = google(process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash-latest");

        console.log("    - Calling Google AI for final plan generation...");
        const { text } = await generateText({
          model,
          system: systemPrompt,
          messages: [{ role: 'user', content: 'Continue.' }],
        });
        console.log("    - AI call successful. Parsing JSON response.");

        try {
          // AIの出力からJSON部分を抽出する
          const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
          const jsonString = jsonMatch ? jsonMatch[1] : text;
          const parsedJson = JSON.parse(jsonString);
          console.log("    - JSON parsing successful. Sending response to client.");
          return NextResponse.json(parsedJson);
        } catch (e) {
          console.error("❌ API Route: Failed to parse JSON response from AI.", e);
          console.error("AI Response Body:", text);
          return NextResponse.json({ error: "AIからの応答が不正なJSON形式でした。" }, { status: 500 });
        }
      }

      default: {
        console.error(`  ❌ Error: Invalid step provided: ${step}`);
        return NextResponse.json({ error: `Invalid step: ${step}` }, { status: 400 });
      }
    }
  } catch (error) {
    console.error("❌ /api/chat: Unhandled error in POST handler.", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}