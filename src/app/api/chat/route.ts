import { NextRequest, NextResponse } from "next/server";
import { CoreMessage, streamText, generateText } from "ai";
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

// Step 2: Create Outline
function buildCreateOutlinePrompt(requirements: string, country: string, kb: string) {
  return `あなたはプロの旅行プランナーです。以下の「旅行の要件」と「ブログ記事からの参考情報」に基づき、**${country}**への旅行プランの骨子を**Markdown形式**で作成してください。

### 絶対的なルール:
- **骨子:** 各日の主要なアクティビティを1〜2個リストアップするのみ。詳細な説明は不要。
- **簡潔さ:** 全体像がわかるように、ごく簡単な旅程を作成する。
- **出力形式:** Markdown形式（見出し、リストなど）を必ず使用する。

---
### 旅行の要件
${requirements}
---
### ブログ記事からの参考情報
${kb}
---
`;
}

// Step 3: Flesh out the plan
function buildFleshOutPlanPrompt(outline: string, country: string, kb: string) {
  return `あなたはプロの旅行プランナーです。以下の「プランの骨子」と「ブログ記事からの参考情報」に基づき、**${country}**への詳細な旅行プランを**Markdown形式**で作成してください。

### 絶対的なルール:
- **旅程のみ出力:** あなたの意見や挨拶などの会話は一切含めず、旅行の日程のみを出力してください。
- **日ごとの見出し:** 各日のプランの最初に「1日目」、「2日目」といった見出しを必ず付けてください。
- **詳細なプラン:** 骨子の各項目に、具体的な説明、移動手段、食事の提案を追加してください。
- **時間と具体性:** 各日のアクティビティには、時間（例: 午前, 13:00）を入れ、推奨する理由を簡潔に述べてください。
- **形式:** 全てMarkdown形式で出力してください。
- **自然な文章:** ブログ記事を参考にしつつも、あなた自身の言葉で自然な文章を作成してください。コピー＆ペーストは禁止です。

---
### プランの骨子
${outline}
---
### ブログ記事からの参考情報
${kb}
---
`;
}

// Step 3.5: Flesh out one day of the plan
function buildFleshOutPlanDailyPrompt(outline: string, country: string, kb: string) {
    return `あなたはプロの旅行プランナーです。以下の「1日のプラン」と「ブログ記事からの参考情報」に基づき、**${country}**への**その日1日分**の詳細な旅行プランを**Markdown形式**で作成してください。

### 絶対的なルール:
- **旅程のみ出力:** あなたの意見や挨拶などの会話は一切含めず、指定された日の旅行日程のみを出力してください。
- **見出し:** プランの最初に「X日目」といった見出しを必ず付けてください。
- **1日分のみ:** 与えられた日のプランだけを詳細にしてください。他の日の言及は不要です。
- **詳細なプラン:** 骨子の各項目に、具体的な説明、移動手段、食事の提案を追加してください。
- **時間と具体性:** 各アクティビティには、時間（例: 午前, 13:00）を入れ、推奨する理由を簡潔に述べてください。
- **形式:** 全てMarkdown形式で出力してください。
- **自然な文章:** ブログ記事を参考にしつつも、あなた自身の言葉で自然な文章を作成してください。コピー＆ペーストは禁止です。

---
### 1日のプラン
${outline}
---
### ブログ記事からの参考情報
${kb}
---
`;
}

// Step 4: Flesh out the plan as a JSON object
function buildFleshOutPlanJsonPrompt(outline: string, country: string, kb: string) {
  return `あなたはプロの旅行プランナーです。以下の「プランの骨子」と「ブログ記事からの参考情報」に基づき、**${country}**への詳細な旅行プランを**指定されたJSON形式**で作成してください。

### 絶対的なルール:
- **JSON形式:** 出力は、指定されたJSONフォーマットに厳密に従う単一のJSONオブジェクトのみとします。他のテキスト（Markdownのバッククォート、説明文など）は一切含めないでください。
- **会話不要:** 挨拶や自己紹介など、プラン以外の内容はJSONに含めないでください。
- **地理座標:** 'location'オブジェクトには必ず'latitude'（緯度）と'longitude'（経度）を含めてください。不明な場合は最適な推定値を提供してください。
- **予算:** 金額はすべて数値型（integer）で入力してください。
- **自然な文章:** ブログ記事を参考にしつつも、あなた自身の言葉で自然な文章を作成してください。コピー＆ペーストは禁止です。

---
### 指定JSONフォーマット
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

---
### プランの骨子
${outline}
---
### ブログ記事からの参考情報
${kb}
---
`;
}


interface ChatRequestBody {
    messages: CoreMessage[];
    articleSlugs: string[];
    countryName: string;
    step: 'extract_requirements' | 'create_outline' | 'flesh_out_plan' | 'flesh_out_plan_daily' | 'flesh_out_plan_json';
    previous_data?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, articleSlugs, countryName, step, previous_data } = (await req.json()) as ChatRequestBody;

    const userMessages = messages.filter((m) => m.role === "user");

    switch (step) {
      case 'extract_requirements': {
        const systemPrompt = buildExtractRequirementsPrompt();
        const { text } = await generateText({
          model: google(process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash"),
          system: systemPrompt,
          messages: userMessages,
        });
        return NextResponse.json({ response: text });
      }

      case 'flesh_out_plan_json': {
        if (!previous_data) {
          return NextResponse.json({ error: `Step '${step}' requires 'previous_data'.` }, { status: 400 });
        }

        const cache = await getPostsCache();
        if (!cache) {
          return NextResponse.json({ error: "Server not ready: Could not load post cache." }, { status: 503 });
        }

        const lowerCasePostsCache: Record<string, string> = {};
        for (const key in cache) {
          lowerCasePostsCache[key.toLowerCase()] = cache[key];
        }

        const articleContents = articleSlugs
          .map((slug) => lowerCasePostsCache[slug.toLowerCase()] || "")
          .filter(Boolean);

        if (articleContents.length === 0) {
            return NextResponse.json({ error: "Could not load reference blog posts." }, { status: 400 });
        }

        const knowledgeBase = articleContents.join("\n\n---\n\n");

        const systemPrompt = buildFleshOutPlanJsonPrompt(previous_data, countryName, knowledgeBase);

        const { text } = await generateText({
            model: google(process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash"),
            system: systemPrompt,
            messages: [{ role: 'user', content: 'Continue.' }],
        });

        try {
            const parsedJson = JSON.parse(text);
            console.log("✅ API Route: Successfully parsed JSON from AI response.", parsedJson);
            return NextResponse.json(parsedJson);
        } catch (parseError) {
            console.error("❌ API Route: Failed to parse JSON from AI response.", {
                error: parseError,
                responseText: text,
            });
            return NextResponse.json({ error: "AI returned an invalid JSON format." }, { status: 500 });
        }
      }

      case 'create_outline':
      case 'flesh_out_plan':
      case 'flesh_out_plan_daily': {
        if (!previous_data) {
          return NextResponse.json({ error: `Step '${step}' requires 'previous_data'.` }, { status: 400 });
        }

        const cache = await getPostsCache();
        if (!cache) {
          return NextResponse.json({ error: "Server not ready: Could not load post cache." }, { status: 503 });
        }

        const lowerCasePostsCache: Record<string, string> = {};
        for (const key in cache) {
          lowerCasePostsCache[key.toLowerCase()] = cache[key];
        }

        const articleContents = articleSlugs
          .map((slug) => lowerCasePostsCache[slug.toLowerCase()] || "")
          .filter(Boolean);

        if (articleContents.length === 0) {
            return NextResponse.json({ error: "Could not load reference blog posts." }, { status: 400 });
        }

        const knowledgeBase = articleContents.join("\n\n---\n\n");

        let systemPrompt = "";
        if (step === 'create_outline') {
            systemPrompt = buildCreateOutlinePrompt(previous_data, countryName, knowledgeBase);
        } else if (step === 'flesh_out_plan') {
            systemPrompt = buildFleshOutPlanPrompt(previous_data, countryName, knowledgeBase);
        } else { // flesh_out_plan_daily
            systemPrompt = buildFleshOutPlanDailyPrompt(previous_data, countryName, knowledgeBase);
        }

        const result = await streamText({
          model: google(process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash"),
          system: systemPrompt,
          // Add a dummy message to satisfy the SDK's non-empty requirement.
          // The actual content is passed via the system prompt for this step.
          messages: [{ role: 'user', content: 'Continue.' }],
        });

        return result.toTextStreamResponse();
      }

      default: {
        return NextResponse.json({ error: `Invalid step: ${step}` }, { status: 400 });
      }
    }
  } catch (error) {
    console.error("❌ /api/chat: Error in POST handler.", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}