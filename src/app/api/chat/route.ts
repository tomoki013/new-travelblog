import { StreamingTextResponse, streamText, CoreMessage } from "ai";
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

// --- System Prompt Builder ---
function buildSystemPrompt(country: string, kb: string) {
  return `あなたはプロの旅行プランナーです。提示された「ブログ記事からの参考情報」とユーザーの「旅行の希望条件」に基づき、**${country}**のユニークな旅行プランを作成してください。

### 絶対的なルール:
- **独自性:** ブログ記事のコピーは厳禁。あなた自身の言葉でプランを作成する。
- **時系列:** 各日のプランには具体的な時間（例: 午前, 13:00）を入れる。
- **理由と引用:** なぜその場所を推奨するのか、ブログの感想（例: 「感動した」）を引用しつつ、あなたの言葉で説明を加える。
- **情報の補完:** プランをより良くするため、ブログにない情報も必要に応じて補う。
- **出力形式:** Markdown形式（見出し、リストなど）を必ず使用する。
- **簡潔さ:** **各日の主要なアクティビティは3〜4つ**に絞り、全体のボリュームが大きくなりすぎないように調整する。

---
### ブログ記事からの参考情報
${kb}
---
`;
}

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, data } = await req.json();
    const { articleSlugs, countryName } = data;

    if (!messages || !articleSlugs || !countryName) {
      return new Response("Request body is missing required fields.", { status: 400 });
    }

    const cache = await getPostsCache();
    if (!cache) {
      return new Response("Server not ready: Could not load post cache.", { status: 503 });
    }

    const lowerCasePostsCache: Record<string, string> = {};
    for (const key in cache) {
      lowerCasePostsCache[key.toLowerCase()] = cache[key];
    }

    const articleContents = articleSlugs
      .map((slug: string) => lowerCasePostsCache[slug.toLowerCase()] || "")
      .filter(Boolean);

    if (articleContents.length === 0) {
      return new Response("Could not load reference blog posts.", { status: 400 });
    }

    const knowledgeBase = articleContents.join("\n\n---\n\n");
    const systemPrompt = buildSystemPrompt(countryName, knowledgeBase);

    const userMessages = (messages as CoreMessage[]).filter(
      (message) => message.role === "user"
    );

    const result = await streamText({
      model: google(process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash"),
      system: systemPrompt,
      messages: userMessages,
    });

    return new StreamingTextResponse(result.toAIStream());

  } catch (error) {
    console.error("❌ /api/chat: Error generating AI plan.", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return new Response(`Error: ${errorMessage}`, { status: 500 });
  }
}