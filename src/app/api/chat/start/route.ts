import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { v4 as uuidv4 } from "uuid";
import { CoreMessage } from "ai";

export const dynamic = "force-dynamic";

interface ChatStartRequestBody {
  messages: CoreMessage[];
  articleSlugs: string[];
  countryName: string;
  destination: string;
  duration: string;
  interests: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      messages,
      articleSlugs,
      countryName,
      destination,
      duration,
      interests,
    } = (await req.json()) as ChatStartRequestBody;

    if (
      !messages ||
      !articleSlugs ||
      !countryName ||
      !destination ||
      !duration ||
      !interests
    ) {
      return NextResponse.json(
        { error: "リクエストのデータが不足しています。" },
        { status: 400 }
      );
    }

    const jobId = uuidv4();
    const store = getStore("ai-planner-jobs");

    // Store the job details for the background function to retrieve
    await store.setJSON(jobId, {
      status: "pending",
      messages,
      articleSlugs,
      countryName,
      destination,
      duration,
      interests,
      createdAt: new Date().toISOString(),
    });

    // Netlifyのバックグラウンド関数をトリガーする
    const url = new URL(req.url);
    const triggerUrl = `${url.protocol}//${url.host}/.netlify/functions/ai-planner-background`;

    // レスポンスは待たずにトリガーだけ行う
    fetch(triggerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobId }),
    }).catch((err) => {
      // エラーはログに出すがクライアントへのレスポンスは妨げない
      console.error("Error invoking background function:", err);
    });

    // Return the jobId to the client immediately
    return NextResponse.json({ jobId });
  } catch (error) {
    console.error("❌ /api/chat/start: Error starting job.", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
