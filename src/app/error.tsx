"use client";

import { useEffect } from "react";
import ErrorDisplay from "@/components/common/ErrorDisplay";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorDisplay reset={reset} />;
}
