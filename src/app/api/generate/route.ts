import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

type StreamPart = {
  text: () => string;
};

function iteratorToStream(iterator: AsyncGenerator<StreamPart>) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(new TextEncoder().encode(value.text()));
      }
    },
  });
}

export async function POST(req: NextRequest) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
  const modelName = process.env.GEMINI_MODEL_NAME || "gemini-pro";
  const model = genAI.getGenerativeModel({ model: modelName });

  try {
    // --- 変更: countryNameを受け取る ---
    const { articleSlugs, countryName, destination, duration, interests } =
      await req.json();

    if (
      !articleSlugs ||
      !Array.isArray(articleSlugs) ||
      articleSlugs.length === 0 ||
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

    const postsDirectory = path.join(process.cwd(), "src", "posts");

    const articleContents = await Promise.all(
      articleSlugs.map(async (slug: string) => {
        try {
          const fullPath = path.join(postsDirectory, `${slug}.md`);
          return await fs.readFile(fullPath, "utf8");
        } catch {
          console.warn(`記事の読み込みに失敗: ${slug}.md`);
          return "";
        }
      })
    );

    const knowledgeBase = articleContents.filter(Boolean).join("\n\n---\n\n");

    if (!knowledgeBase) {
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

    const prompt = `
あなたはプロの旅行プランナーです。
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
### 旅行の希望条件
- **国:** ${countryName}
- **行き先:** ${destination}
- **期間:** ${duration}
- **興味・関心:** ${interests}
---

それでは、上記を踏まえて、最高の旅行プランを提案してください。
`;

    const result = await model.generateContentStream(prompt);

    const stream = iteratorToStream(result.stream);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error(
      "❌ /api/generate: 処理中に致命的なエラーが発生しました。",
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
