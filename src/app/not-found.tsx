import Link from "next/link";
import type { Metadata } from "next";
import { Compass, Map } from "lucide-react";

export const metadata: Metadata = {
  title: "404: Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-8 text-center">
      <div className="relative flex h-48 w-48 items-center justify-center">
        <Map
          className="absolute h-40 w-40 animate-pulse text-muted"
          strokeWidth={1}
        />
        <Compass
          className="relative h-24 w-24 animate-spin text-primary/70"
          style={{ animationDuration: "10s" }}
          strokeWidth={1.5}
        />
      </div>
      <div className="space-y-4">
        <h1 className="font-heading text-4xl font-bold text-foreground">
          404 - 道に迷いましたか？
        </h1>
        <p className="text-muted-foreground">
          お探しのページは見つからないようです。
          <br />
          でも、心配ありません。道に迷うのも旅の醍醐味です。
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        新しい冒険を始める
      </Link>
    </div>
  );
}
