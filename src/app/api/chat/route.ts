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
  return `あなたはプロの旅行プランナーです。以下の「プランの骨子」と「ブログ記事からの参考情報」に基づき、**${country}**への詳細な旅行プランを**Markdown形式**で完成させてください。

### 絶対的なルール:
- **詳細化:** 骨子で示された各アクティビティに、具体的な説明、移動手段、おすすめのレストラン情報などを追加する。
- **独自性:** ブログ記事のコピーは厳禁。あなた自身の言葉でプランを作成する。
- **時系列:** 各日のプランには具体的な時間（例: 午前, 13:00）を入れる。
- **理由と引用:** なぜその場所を推奨するのか、ブログの感想（例: 「感動した」）を引用しつつ、あなたの言葉で説明を加える。
- **情報の補完:** プランをより良くするため、ブログにない情報も必要に応じて補う。
- **出力形式:** Markdown形式（見出し、リストなど）を必ず使用する。

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
    step: 'extract_requirements' | 'create_outline' | 'flesh_out_plan';
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

      case 'create_outline':
      case 'flesh_out_plan': {
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

        const systemPrompt =
          step === 'create_outline'
            ? buildCreateOutlinePrompt(previous_data, countryName, knowledgeBase)
            : buildFleshOutPlanPrompt(previous_data, countryName, knowledgeBase);

        const result = await streamText({
          model: google(process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash"),
          system: systemPrompt,
          messages: [], // We are putting all context in the system prompt for these steps
        });

        return result.toAIStreamResponse();
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