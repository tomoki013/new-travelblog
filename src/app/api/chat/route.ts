import { streamText, CoreMessage } from "ai";
import { google } from "@ai-sdk/google";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

// Pre-load the cache when the server starts
const postsCachePath = path.join(process.cwd(), ".posts.cache.json");
let postsCache: Record<string, string> | null = null;

async function loadCache() {
  try {
    const data = await fs.readFile(postsCachePath, "utf8");
    postsCache = JSON.parse(data);
    console.log("✅ Posts cache loaded successfully.");
  } catch (error) {
    console.error(
      "❌ Failed to load posts cache. The build process might not have run correctly.",
      error
    );
  }
}

loadCache();

export async function POST(req: NextRequest) {
  try {
    // The client may send either { messages, data: { ... } } or a flat object
    // { messages, articleSlugs, countryName, destination, duration, interests }
    const body = await req.json().catch(() => ({}));

    let messages: CoreMessage[] | undefined;
    let articleSlugs: string[] | undefined;
    let countryName: string | undefined;
    let destination: string | undefined;
    let duration: string | undefined;
    let interests: string | undefined;

    if (body) {
      // prefer nested `data` if present
      if (body.data && typeof body.data === "object") {
        messages = body.messages as CoreMessage[];
        articleSlugs = body.data.articleSlugs as unknown as string[];
        countryName = body.data.countryName as string;
        destination = body.data.destination as string;
        duration = body.data.duration as string;
        interests = body.data.interests as string;
      } else {
        // flat payload
        messages = body.messages as CoreMessage[];
        articleSlugs = body.articleSlugs as unknown as string[];
        countryName = body.countryName as string;
        destination = body.destination as string;
        duration = body.duration as string;
        interests = body.interests as string;
      }
    }

    if (
      !messages ||
      !Array.isArray(messages) ||
      messages.length === 0 ||
      !articleSlugs ||
      !countryName ||
      !destination ||
      !duration ||
      !interests
    ) {
      return new Response(
        JSON.stringify({ error: "リクエストのデータが不足しています。" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!postsCache) {
      // Try to load existing cache file first
      await loadCache();
      // If still missing, build postsCache from markdown files in src/posts
      if (!postsCache) {
        try {
          const postsDir = path.join(process.cwd(), "src/posts");
          // check whether postsDir exists
          const stat = await fs.stat(postsDir).catch(() => null);
          if (!stat || !stat.isDirectory()) {
            console.warn(`Posts directory not found at ${postsDir}`);
            throw new Error("posts directory not found");
          }
          const files = await fs.readdir(postsDir);
          const mdFiles = files.filter((f) => f.endsWith(".md"));
          const built: Record<string, string> = {};
          for (const file of mdFiles) {
            const slug = file.replace(/\.md$/i, "");
            const content = await fs.readFile(
              path.join(postsDir, file),
              "utf8"
            );
            built[slug] = content;
          }
          if (Object.keys(built).length > 0) {
            postsCache = built;
            // attempt to persist cache file for faster subsequent starts, but ignore errors
            fs.writeFile(
              postsCachePath,
              JSON.stringify(postsCache),
              "utf8"
            ).catch((e) => {
              console.warn(
                "Could not write posts cache file:",
                e?.message ?? e
              );
            });
            console.log("✅ Built posts cache from src/posts fallback.");
          }
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          console.error("❌ Failed to build posts cache from src/posts:", msg);
        }
      }

      if (!postsCache) {
        return new Response(
          JSON.stringify({
            error:
              "サーバーの準備ができていません。キャッシュを読み込めませんでした。",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    const articleContents = (articleSlugs as unknown as string[])
      .map((slug) => {
        return postsCache![slug] || "";
      })
      .filter(Boolean);

    if (articleContents.length === 0) {
      return new Response(
        JSON.stringify({
          error: "参考にできるブログ記事を読み込めませんでした。",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const knowledgeBase = articleContents.join("\n\n---\n\n");

    const systemPrompt = `あなたはプロの旅行プランナーです。
以下の「ブログ記事からの参考情報」をインスピレーション源として活用し、ユーザーからの「旅行の希望条件」を満たす、魅力的で実行可能な**${countryName}**の旅行プランを提案してください。

重要：
- ブログ記事の内容をそのままコピーするのではなく、あなた自身の言葉で、ユーザーのためだけに作られたユニークなプランを作成してください。
- 各日のプランは、具体的な時間（例：午前、13:00など）を入れて、時系列で分かりやすく記述してください。
- なぜその場所やレストランをおすすめするのか、ブログ筆者の感想（「とても美味しかった」「感動した」など）を引用しつつ、あなたの言葉で説明を加えてください。
- ブログにない情報でも、プランをより魅力的にするために必要であれば、あなたの知識を元に情報を補完しても構いません（例：「近くには〇〇というお土産屋さんもあります」）。
- 出力はMarkdown形式で、見出しやリストを適切に使用してください。

---
### ブログ記事からの参考情報
${knowledgeBase}
---
`;

    const result = await streamText({
      model: google(process.env.GEMINI_MODEL_NAME || "gemini-pro"),
      system: systemPrompt,
      messages: messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error(
      "❌ /api/chat: 処理中に致命的なエラーが発生しました。",
      error
    );
    let errorMessage = "AIの応答生成中にサーバーで不明なエラーが発生しました。";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
