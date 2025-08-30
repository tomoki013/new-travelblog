import { getAllPosts } from "@/lib/posts";
import BlogClient from "./Client";
import { Suspense } from "react";
import { Metadata } from "next";
import { LoadingAnimation } from "@/components/featured/LoadingAnimation/LoadingAnimation";

export const metadata: Metadata = {
  title: "全記事一覧 - Blog ",
  description:
    "「ともきちの旅行日記」の全記事を時系列で掲載しています。世界中の旅の記録や旅行記、観光情報をお届け。あなたの次の冒険のヒントがきっと見つかります。",
};

const PostsPage = async () => {
  // 1. サーバーサイドで全記事データを取得
  const allPosts = await getAllPosts();

  // 2. クライアントコンポーネントにプロップとして渡す
  return (
    <Suspense fallback={<LoadingAnimation variant="mapRoute" />}>
      <BlogClient allPosts={allPosts} />
    </Suspense>
  );
};

export default PostsPage;
