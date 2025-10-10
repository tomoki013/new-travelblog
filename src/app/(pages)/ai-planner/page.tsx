import { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import { regionData } from "@/data/region";
import AiPlannerClient from "./Client";

export const metadata: Metadata = {
  title: "AI旅行プランナー（ベータ版）",
  description: "「ともきちの旅行日記」のAI旅行プランナー（ベータ版）が新登場！行きたい国を入力するだけで、豊富な旅行記をもとにAIがあなただけのオリジナル旅行プランを自動作成します。観光ルートやお店も提案し、旅行の準備がぐっと楽に。ぜひこの便利な新機能をお試しください！フィードバックも募集中です。",
};

export default async function AiPlannerPage() {
  const allPosts = await getAllPosts();

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          AI旅行プランナー（ベータ版）
        </h1>
        <p className="mb-6 text-muted-foreground">
          あなたの希望を入力してください。ブログの旅行記を参考に、AIがあなただけの特別な旅行プランを作成します。
          <br />
          この機能は現在ベータ版です。お気づきの点や改善のご提案がございましたら、ぜひフィードバックをお寄せください。
        </p>
        <Suspense fallback={<div>読み込み中...</div>}>
          <AiPlannerClient allPosts={allPosts} continents={regionData} />
        </Suspense>
      </div>
    </div>
  );
}
