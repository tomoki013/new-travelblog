import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

export const dynamic = "force-dynamic";

interface Job {
  status: "PENDING" | "COMPLETED" | "FAILED";
  result?: string;
  error?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;
  if (!jobId) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  try {
    const store = getStore("ai-jobs");
    const job = await store.get(jobId, { type: "json" });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Only return the status and error, not the full content
    return NextResponse.json({ status: (job as Job).status, error: (job as Job).error });

  } catch (error) {
    console.error(`❌ Failed to read status for job ${jobId}:`, error);
    return NextResponse.json({ error: "Failed to get job status" }, { status: 500 });
  }
}