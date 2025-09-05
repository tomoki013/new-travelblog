import type { NextConfig } from "next";
import withSerwist from "@serwist/next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    loader: "custom",
    loaderFile: "./netlify-loader.ts",
  },
};

export default withSerwist({
  // Serwist の設定
  swSrc: "src/app/sw.ts", // サービスワーカーのソースファイル
  swDest: "public/sw.js", // 出力されるサービスワーカーファイル
  disable: process.env.NODE_ENV === "development", // 開発環境では無効にする
  // ...その他の設定はここに記述
})(nextConfig);
