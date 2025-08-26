import { notFound } from "next/navigation";
import { getAllPostTypes, getPostBySlug } from "./markdown";
import type { Post, PostType } from "@/types/types";
import { regionData } from "@/data/region";

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
  locations: string[],
  limit: number = 3
): Post[] => {
  const allPosts = getAllPostTypes();

  const relatedPosts = allPosts.filter((post) => {
    if (post.slug === currentSlug) {
      return false;
    }
    return (
      Array.isArray(post.location) &&
      post.location.some((loc) => locations.includes(loc))
    );
  });

  const uniquePosts = Array.from(
    new Map(relatedPosts.map((post) => [post.slug, post])).values()
  );

  return uniquePosts.slice(0, limit);
};

/**
 * 指定された地域とその子地域に関連するすべての記事を取得し、カテゴリ別に分類します。
 * @param regionSlug - 記事を取得したい地域のスラッグ
 * @returns カテゴリ分けされた記事のオブジェクト
 */
export const getPostsByRegion = (regionSlug: string) => {
  const allPosts = getAllPostTypes();

  const country = regionData
    .flatMap((continent) => continent.countries)
    .find((c) => c.slug === regionSlug);

  const targetSlugs = [regionSlug];
  if (country && country.children) {
    targetSlugs.push(...country.children.map((child) => child.slug));
  }

  const filteredPosts = allPosts.filter((post) =>
    post.location.some((loc) => targetSlugs.includes(loc))
  );

  const seriesPosts = filteredPosts.filter((post) => post.type === "series");
  const tourismPosts = filteredPosts.filter(
    (post) => post.type === "tourism"
  );
  const itineraryPosts = filteredPosts.filter(
    (post) => post.type === "itinerary"
  );

  return {
    seriesPosts,
    tourismPosts,
    itineraryPosts,
  };
};
