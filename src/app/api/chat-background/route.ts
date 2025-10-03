import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { generateText, CoreMessage } from "ai";
import { google } from "@ai-sdk/google";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// Next.jsのAPIルートとして正しく認識させるため、ランタイムを指定します
export const dynamic = "force-dynamic";

// Define the structure of the data stored in the blob
interface JobData {
  status: "pending" | "processing" | "completed" | "failed";
  messages: CoreMessage[];
  articleSlugs: string[];
  countryName: string;
  destination: string;
  duration: string;
  interests: string;
  createdAt: string;
  result?: string;
  error?: string;
}

// --- Post Cache Logic (copied and adapted from original route) ---
const postsCachePath = path.join(process.cwd(), ".posts.cache.json");
let postsCache: Record<string, string> | null = null;

async function loadCache() {
  if (postsCache) return; // Avoid reloading if already cached
  try {
    const data = await fs.readFile(postsCachePath, "utf8");
    postsCache = JSON.parse(data);
    console.log("✅ BG: Posts cache loaded successfully.");
  } catch {
    console.warn(
      "BG: Failed to load posts cache from file. Will try to build from source."
    );
    postsCache = null; // Ensure it's null if loading fails
  }
}

async function buildCacheFromSource() {
  try {
    const postsDir = path.join(process.cwd(), "src/posts");
    const stat = await fs.stat(postsDir).catch(() => null);
    if (!stat || !stat.isDirectory()) {
      console.warn(`BG: Posts directory not found at ${postsDir}`);
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
      console.log("✅ BG: Built posts cache from src/posts fallback.");
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("❌ BG: Failed to build posts cache from src/posts:", msg);
  }
}

async function getPostsCache() {
  if (!postsCache) {
    await loadCache();
  }
  if (!postsCache) {
    await buildCacheFromSource();
  }
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

// --- Next.js API Route Handler (for Background Function) ---
// ★ 修正点: `handler`から`POST`関数に変更
export async function POST(req: NextRequest) {
  // Netlifyがリクエストを受け付けた後、この中の処理がバックグラウンドで実行されます。

  // ★ 修正点: リクエストボディからjobIdを取得
  const { jobId } = (await req.json()) as { jobId: string };
  if (!jobId) {
    console.error("❌ BG: No jobId provided in the request body.");
    // バックグラウンドではこのレスポンスは意味を持ちませんが、早期リターンします
    return NextResponse.json({ error: "No jobId provided" }, { status: 400 });
  }

  const store = getStore("ai-planner-jobs");

  try {
    const jobData = (await store.get(jobId, { type: "json" })) as JobData;
    if (!jobData) {
      throw new Error(`Job data not found for jobId: ${jobId}`);
    }

    // Mark job as processing
    await store.setJSON(jobId, { ...jobData, status: "processing" });

    // --- Main Logic ---
    const cache = await getPostsCache();
    if (!cache) {
      throw new Error(
        "サーバーの準備ができていません。記事のキャッシュを読み込めませんでした。"
      );
    }

    const lowerCasePostsCache: Record<string, string> = {};
    for (const key in cache) {
      lowerCasePostsCache[key.toLowerCase()] = cache[key];
    }

    const articleContents = jobData.articleSlugs
      .map((slug) => lowerCasePostsCache[slug.toLowerCase()] || "")
      .filter(Boolean);

    if (articleContents.length === 0) {
      throw new Error("参考にできるブログ記事を読み込めませんでした。");
    }

    const knowledgeBase = articleContents.join("\n\n---\n\n");
    const systemPrompt = buildSystemPrompt(jobData.countryName, knowledgeBase);

    const userMessages = jobData.messages.filter(
      (message) => message.role === "user"
    );

    const { text } = await generateText({
      model: google(process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash"),
      system: systemPrompt,
      messages: userMessages,
    });

    // --- Job Completion ---
    await store.setJSON(jobId, {
      ...jobData,
      status: "completed",
      result: text,
    });
    console.log(`✅ BG: Job ${jobId} completed successfully.`);
  } catch (error) {
    console.error(`❌ BG: Error processing job ${jobId}:`, error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    await store.setJSON(jobId, {
      status: "failed",
      error: errorMessage,
    });
  }

  // このレスポンスはクライアントには直接届きませんが、APIルートとして返す必要があります。
  return NextResponse.json({ message: "Background process acknowledged." });
}
