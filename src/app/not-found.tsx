import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-8 text-center">
      <div className="map-container">
        <svg className="unfolding-map" viewBox="0 0 100 100">
          <rect className="map-background" width="100" height="100" />
          <path
            className="map-fold"
            d="M0 0 H50 V50 H0Z"
            style={{ animationDelay: "0s" }}
          />
          <path
            className="map-fold"
            d="M50 0 H100 V50 H50Z"
            style={{ animationDelay: "0.2s" }}
          />
          <path
            className="map-fold"
            d="M0 50 H50 V100 H0Z"
            style={{ animationDelay: "0.4s" }}
          />
          <path
            className="map-fold"
            d="M50 50 H100 V100 H50Z"
            style={{ animationDelay: "0.6s" }}
          />
          <text x="50" y="68" textAnchor="middle" className="question-mark">
            ?
          </text>
        </svg>
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
