import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

export const dynamic = "force-dynamic";

interface JobPayload {
  status: "pending" | "processing" | "completed" | "failed";
  result?: string;
  error?: string;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;

  if (!jobId) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  try {
    const store = getStore("ai-planner-jobs");
    const data = (await store.get(jobId, { type: "json" })) as JobPayload;

    if (!data) {
      return NextResponse.json({ status: "not_found" }, { status: 404 });
    }

    // Return only the necessary fields to the client
    const responsePayload: { status: string; result?: string; error?: string } =
      {
        status: data.status,
      };

    if (data.status === "completed") {
      responsePayload.result = data.result;
    } else if (data.status === "failed") {
      responsePayload.error = data.error;
    }

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error(
      `❌ /api/chat/status: Error fetching status for job ${jobId}.`,
      error
    );
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}