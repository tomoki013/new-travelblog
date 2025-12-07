/// <reference lib="WebWorker" />
import {
  Serwist,
  type SerwistGlobalConfig,
  type RuntimeCaching,
} from "serwist";
import { StaleWhileRevalidate, NetworkFirst } from "@serwist/strategies";
import { ExpirationPlugin } from "serwist";
import type { PrecacheEntry } from "@serwist/precaching";
import { defaultCache } from "@serwist/next/worker";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __RSC_MANIFEST: (PrecacheEntry | string)[] | undefined;
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

// 1️⃣ RSC / Prefetch など Next.js 特有の要求対応
const runtimeCaching: RuntimeCaching[] = [
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get("RSC") === "1" &&
      request.headers.get("Next-Router-Prefetch") === "1" &&
      sameOrigin &&
      !pathname.startsWith("/api/"),
    handler: new StaleWhileRevalidate({
      cacheName: "rsc-prefetch",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24h
        }),
      ],
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get("RSC") === "1" &&
      sameOrigin &&
      !pathname.startsWith("/api/"),
    handler: new NetworkFirst({
      cacheName: "rsc-pages",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60,
        }),
      ],
    }),
  },

  // 2️⃣ 通常ページ (HTML)
  {
    matcher: ({ request, sameOrigin }) =>
      sameOrigin && request.mode === "navigate",
    handler: new NetworkFirst({
      cacheName: "html-pages",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7日
        }),
      ],
    }),
  },
];

// 3️⃣ 最後にデフォルトキャッシュを追加
const caching = [...runtimeCaching, ...defaultCache];

const serwist = new Serwist({
  precacheEntries: self.__RSC_MANIFEST,
  runtimeCaching: caching,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  fallbacks: {
    entries: [
      {
        url: "/offline", // Optional: offline フォールバック
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
