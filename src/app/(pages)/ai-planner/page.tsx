import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { regionData } from "@/data/region";
import AiPlannerClient from "./Client";
import AIPlannerHero from "@/components/sections/AIPlannerHero";

export const metadata: Metadata = {
  title: "AI Travel Planner",
  description: "Create your personalized travel plan with AI.",
};

export default async function AiPlannerPage() {
  const allPosts = await getAllPosts();

  return (
    <>
      <AIPlannerHero />
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">AI旅行プランナー（ベータ版）</h1>
          <p className="mb-6 text-muted-foreground">
            あなたの希望を入力してください。ブログの旅行記を参考に、AIがあなただけの特別な旅行プランを作成します。
            <br />
            この機能は現在ベータ版です。お気づきの点や改善のご提案がございましたら、ぜひフィードバックをお寄せください。
          </p>
          <AiPlannerClient allPosts={allPosts} continents={regionData} />
        </div>
      </div>
    </>
  );
}
