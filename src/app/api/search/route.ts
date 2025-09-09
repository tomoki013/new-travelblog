import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { filterPostsBySearch, calculateScores } from "@/lib/search";
import { SEARCH_CONFIG } from "@/constants/searchConfig";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");

  if (!query && !category) {
    return NextResponse.json(
      { error: "Query or category parameter is missing" },
      { status: 400 },
    );
  }

  try {
    const allPosts = await getAllPosts();
    let postsToSearch = allPosts;

    // 1. カテゴリで絞り込み（カテゴリが指定されている場合）
    if (category) {
      postsToSearch = postsToSearch.filter(
        (post) => post.category === category,
      );
    }

    let finalPosts = postsToSearch;

    // 2. 検索クエリでさらにフィルタリング & スコアリング（クエリがある場合）
    if (query) {
      const filteredBySearch = filterPostsBySearch(postsToSearch, query);
      const scoredPosts = calculateScores(filteredBySearch, query);
      finalPosts = scoredPosts
        .sort((a, b) => b.score - a.score)
        .map((item) => item.post);
    }

    // 3. 上位件数を候補として返却
    const suggestions = finalPosts
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
      { status: 500 },
    );
  }
}
