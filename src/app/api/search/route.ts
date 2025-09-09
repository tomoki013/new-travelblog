import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { filterPostsBySearch, calculateScores } from "@/lib/search";
import { SEARCH_CONFIG } from "@/constants/searchConfig";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const allPosts = await getAllPosts();

    // 1. 検索クエリで記事をフィルタリング
    const filteredPosts = filterPostsBySearch(allPosts, query);

    // 2. 関連度順にスコアリングしてソート
    const scoredPosts = calculateScores(filteredPosts, query);
    const sortedPosts = scoredPosts
      .sort((a, b) => b.score - a.score)
      .map((item) => item.post);

    // 3. 上位件数を候補として返却
    const suggestions = sortedPosts
      .slice(0, SEARCH_CONFIG.API_MAX_RESULTS)
      .map((post) => ({
        title: post.title,
        slug: post.slug,
      }));

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
