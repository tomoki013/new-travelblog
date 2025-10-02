import { getAllPosts } from "@/lib/posts";
import { regionData } from "@/data/region"; // region.ts から regionData をインポート
import AiPlannerClient from "./Client"; // Clientコンポーネント名を修正

// page.tsx を "async" 関数に変更します
export default async function AiPlannerPage() {
  // サーバーサイドで非同期的に全ての記事情報を "await" で待ってから取得します
  const allPosts = await getAllPosts();

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          AI旅行プランナー（ベータ版）
        </h1>
        <p className="mb-6 text-muted-foreground">
          あなたの希望を入力してください。ブログの旅行記を参考に、AIがあなただけの特別な旅行プランを作成します。
        </p>
        {/* Clientコンポーネントに正しい名前でデータを渡します */}
        <AiPlannerClient allPosts={allPosts} continents={regionData} />
      </div>
    </div>
  );
}
