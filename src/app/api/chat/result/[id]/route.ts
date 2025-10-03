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
    const job = await store.get(jobId, { type: "json" }) as Job | null;

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.status === "COMPLETED") {
      // Return the generated plan content and delete the blob
      await store.delete(jobId);
      return NextResponse.json({ result: job.result });
    } else if (job.status === "FAILED") {
      // Return error and delete the blob
      await store.delete(jobId);
      return NextResponse.json(
        { error: "Job failed", details: job.error },
        { status: 500 }
      );
    } else {
      // If status is PENDING or anything else
      return NextResponse.json(
        { error: "Job is still processing" },
        { status: 202 } // 202 Accepted indicates the request is not yet complete
      );
    }
  } catch (error) {
    console.error(`❌ Failed to read result for job ${jobId}:`, error);
    return NextResponse.json({ error: "Failed to get job result" }, { status: 500 });
  }
}