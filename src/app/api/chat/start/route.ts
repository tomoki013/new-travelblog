import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { v4 as uuidv4 } from "uuid";
import { invoke } from "@netlify/functions";
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

    // Invoke the background function asynchronously.
    // The function name 'chat-background' must match what's in netlify.toml
    await invoke("chat-background", {
      body: JSON.stringify({ jobId }),
    });

    // Return the jobId to the client
    return NextResponse.json({ jobId });
  } catch (error) {
    console.error("❌ /api/chat/start: Error starting job.", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}