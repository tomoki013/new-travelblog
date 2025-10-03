import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { CoreMessage, streamText } from "ai";
import { getStore } from "@netlify/blobs";
import path from "path";
import matter from "gray-matter";
import crypto from "crypto";
import fs from "fs/promises"; // Keep for post cache loading

export const dynamic = "force-dynamic";

// Define the structure for job status
interface Job {
  status: "PENDING" | "COMPLETED" | "FAILED";
  result?: string;
  error?: string;
}

// --- Post Cache Loading Logic (Remains the same) ---
const postsCachePath = path.join(process.cwd(), ".posts.cache.json");
let postsCache: Record<string, string> | null = null;

async function loadCache() {
  try {
    const data = await fs.readFile(postsCachePath, "utf8");
    postsCache = JSON.parse(data);
    console.log("✅ Posts cache loaded successfully.");
  } catch (error) {
    console.warn(
      "Could not load posts cache from file. Will try to build from source.",
      error
    );
    postsCache = null;
  }
}

async function buildCacheFromSource() {
    try {
        const postsDir = path.join(process.cwd(), "src/posts");
        const stat = await fs.stat(postsDir).catch(() => null);
        if (!stat || !stat.isDirectory()) {
            console.warn(`Posts directory not found at ${postsDir}`);
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
            console.log("✅ Built posts cache from src/posts fallback.");
            fs.writeFile(postsCachePath, JSON.stringify(postsCache), "utf8").catch(e => {
                console.warn("Could not write posts cache file:", e?.message ?? e);
            });
        }
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error("❌ Failed to build posts cache from src/posts:", msg);
    }
}

loadCache();

// Define the structure for the request body to avoid using `any`
interface GeneratePlanRequestBody {
  messages: CoreMessage[];
  articleSlugs: string[];
  countryName: string;
  destination: string;
  duration: string;
  interests: string;
}

// --- Background AI Generation Function using Netlify Blobs ---
async function generatePlan(jobId: string, requestBody: GeneratePlanRequestBody) {
  const store = getStore("ai-jobs");

  try {
     if (!process.env.GOOGLE_API_KEY && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("サーバー側でGoogle AI APIキーが設定されていません。");
    }

    const {
      messages,
      articleSlugs,
      countryName,
    } = requestBody;

    if (!postsCache) {
      await buildCacheFromSource();
      if (!postsCache) {
          throw new Error("Server is not ready, post cache is unavailable.");
      }
    }

    const lowerCasePostsCache: Record<string, string> = {};
    for (const key in postsCache) {
      lowerCasePostsCache[key.toLowerCase()] = postsCache[key];
    }

    const articleContents = (articleSlugs as string[])
      .map((slug) => lowerCasePostsCache[slug.toLowerCase()] || "")
      .filter(Boolean);

    if (articleContents.length === 0) {
      throw new Error("Could not load any relevant blog articles.");
    }

    const knowledgeBase = articleContents.join("\n\n---\n\n");

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

    const systemPrompt = buildSystemPrompt(countryName || "", knowledgeBase);
    const correctedMessages = messages.map((message: CoreMessage) =>
      (message.role as string) === "ai"
        ? { ...message, role: "assistant" as const }
        : message
    );

    const { text } = await streamText({
      model: google(process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash"),
      system: systemPrompt,
      messages: correctedMessages,
    });

    const finalResult = await text;

    const job: Job = { status: "COMPLETED", result: finalResult };
    await store.setJSON(jobId, job);
    console.log(`✅ Job ${jobId} completed successfully.`);

  } catch (error) {
    console.error(`❌ Job ${jobId} failed:`, error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const job: Job = { status: "FAILED", error: errorMessage };
    await store.setJSON(jobId, job).catch(e => {
        console.error(`❌ Failed to write FAILED status for job ${jobId}:`, e);
    });
  }
}

// --- API Endpoint ---
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { messages, articleSlugs, countryName, destination, duration, interests } = body;
    if (!messages || !articleSlugs || !countryName || !destination || !duration || !interests) {
        return NextResponse.json({ error: "リクエストのデータが不足しています。" }, { status: 400 });
    }

    const jobId = crypto.randomBytes(16).toString("hex");
    const store = getStore("ai-jobs");

    const initialJob: Job = { status: "PENDING" };
    await store.setJSON(jobId, initialJob);

    generatePlan(jobId, body);

    return NextResponse.json({ jobId });

  } catch (error) {
    console.error("❌ /api/chat/start: Failed to initiate job.", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error during job initiation.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}