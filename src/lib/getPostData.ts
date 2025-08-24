import { notFound } from "next/navigation";
import { getAllPostTypes, getPostBySlug } from "./markdown";
import type { Post, PostType } from "@/types/types";

export async function getPostData(type: PostType, slug: string) {
  const post = await getPostBySlug(type, slug);
  if (!post) {
    notFound();
  }
  return post;
}

/**
 * 関連記事を取得する
 * @param currentSlug 現在の記事のスラッグ
 * @param locations 関連地域コードの配列
 * @param limit 取得する最大件数
 * @returns 関連記事の配列
 */
export const getRelatedPosts = (
  currentSlug: string,
  locations: string[], // 単一の文字列から文字列の配列を受け取るように変更
  limit: number = 3
): Post[] => {
  const allPosts = getAllPostTypes();

  const relatedPosts = allPosts.filter((post) => {
    // 自分自身の記事は除外する
    if (post.slug === currentSlug) {
      return false;
    }

    // 記事が持つ地域 (post.location) と、現在の記事の地域 (locations) を比較し、
    // 一つでも共通の地域があれば関連記事とみなす
    return (
      Array.isArray(post.location) &&
      post.location.some((loc) => locations.includes(loc))
    );
  });

  // 念のため重複を除外（複数の地域で関連した場合など）
  const uniquePosts = Array.from(
    new Map(relatedPosts.map((post) => [post.slug, post])).values()
  );

  return uniquePosts.slice(0, limit);
};
