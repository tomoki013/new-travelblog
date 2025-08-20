import { getAllPostTypes } from "@/lib/markdown";
import BlogClient from "./Client";
import { Suspense } from "react";
// getAllPostTypes()が返す記事の型を定義しておくと便利です
import { Post } from "@/types/types"; // 仮の型定義パス
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "全記事一覧 - Blog ",
  description:
    "「ともきちの旅行日記」の全記事を時系列で掲載しています。世界中の旅の記録や旅行記、観光情報をお届け。あなたの次の冒険のヒントがきっと見つかります。",
};

const PostsPage = () => {
  // 1. サーバーサイドで全記事データを取得
  const allPosts: Post[] = getAllPostTypes();

  // 2. クライアントコンポーネントにプロップとして渡す
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient allPosts={allPosts} />
    </Suspense>
  );
};

export default PostsPage;
