"use client";

import Link from "next/link";
import type { Metadata } from "next";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-8 overflow-hidden bg-gray-900 text-center text-white">
      <div className="relative h-64 w-full max-w-lg">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Stars */}
          <circle cx="50" cy="30" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '0s' }} />
          <circle cx="150" cy="20" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="250" cy="40" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="350" cy="35" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          <circle cx="100" cy="50" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '2s' }} />
          <circle cx="200" cy="60" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '2.5s' }} />
          <circle cx="300" cy="55" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '3s' }} />

          {/* Mountains */}
          <path d="M0 150 L100 50 L150 100 L250 30 L350 120 L400 80 V200 H0 Z" fill="#1a202c" />
          <path d="M0 160 L80 100 L130 130 L200 80 L280 150 L400 120 V200 H0 Z" fill="#2d3748" />

          {/* Road */}
          <polygon points="180,200 220,200 280,100 120,100" fill="#4a5568" />

          {/* Road markings */}
          <line x1="200" y1="200" x2="200" y2="100" stroke="white" strokeWidth="2" strokeDasharray="10 5" className="animate-road-lines" />
        </svg>
      </div>
      <div className="z-10 space-y-4">
        <h1 className="font-heading text-4xl font-bold text-white">
          404 - 新たな地平線
        </h1>
        <p className="text-gray-300">
          お探しの道は見つかりませんでしたが、
          <br />
          目の前には壮大な旅が広がっています。
        </p>
      </div>
      <Link
        href="/"
        className="z-10 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        旅を始める
      </Link>
    </div>
  );
}
