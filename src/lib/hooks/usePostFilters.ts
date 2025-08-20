import { useState, useEffect, useMemo, useCallback } from "react";
import { Post } from "@/types/types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  allCategories as defaultAllCategories,
  diaryCategories,
  tourismCategories,
  itineraryCategories,
} from "@/data/categories";

interface scoredPosts extends Post {
  score?: number; // スコアを追加
}

interface UsePostFiltersParams {
  basePosts: scoredPosts[];
  initialKeyword?: string;
  initialCategory?: string;
  initialBudget?: string;
  syncWithUrl?: boolean;
  pageTypeForTabs?: "all" | "diary" | "tourism" | "itinerary";
}

// 検索キーワードの正規化
const normalizeSearchKeyword = (keyword: string): string[] => {
  return keyword
    .toLowerCase()
    .replace(/[、，&]/g, " ") // 日本語の句読点や&をスペースに変換
    .split(/\s+/)
    .filter(Boolean);
};

// 検索対象テキストの正規化
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[　\s]/g, " ") // 全角スペースを半角スペースに変換
    .trim();
};

// 部分一致検索の実装
const isPartialMatch = (searchText: string, targetText: string): boolean => {
  const normalizedSearch = normalizeText(searchText);
  const normalizedTarget = normalizeText(targetText);
  return normalizedTarget.includes(normalizedSearch);
};

// 配列内の任意の要素との部分一致検索
const isArrayMatch = (
  searchKeywords: string[],
  targetArray: string[]
): boolean => {
  return searchKeywords.some((keyword) =>
    targetArray.some((item) => isPartialMatch(keyword, item))
  );
};

// 全てのキーワードが配列内のいずれかの要素にマッチするかチェック
const isAllKeywordsMatch = (
  searchKeywords: string[],
  targetArray: string[]
): boolean => {
  return searchKeywords.every((keyword) =>
    targetArray.some((item) => isPartialMatch(keyword, item))
  );
};

// スコア計算ロジック
const calculatePostScore = (post: Post, searchKeywords: string[]): number => {
  if (searchKeywords.length === 0) return 1;

  let score = 0;
  const weights = {
    title: 10,
    location: 8,
    tags: 6,
    category: 5,
    excerpt: 3,
    content: 1,
    author: 2,
  };

  // タイトルでの検索
  if (
    post.title &&
    searchKeywords.some((keyword) => isPartialMatch(keyword, post.title))
  ) {
    score += weights.title;
    // 完全一致の場合はボーナス
    if (
      searchKeywords.some((keyword) =>
        normalizeText(post.title).includes(normalizeText(keyword))
      )
    ) {
      score += 5;
    }
  }

  // ロケーションでの検索
  if (post.location && post.location.length > 0) {
    if (isArrayMatch(searchKeywords, post.location)) {
      score += weights.location;
    }
    // 全てのキーワードがロケーションにマッチする場合はボーナス
    if (isAllKeywordsMatch(searchKeywords, post.location)) {
      score += 3;
    }
  }

  // タグでの検索
  if (post.tags && post.tags.length > 0) {
    if (isArrayMatch(searchKeywords, post.tags)) {
      score += weights.tags;
    }
  }

  // カテゴリでの検索
  if (post.category && post.category.length > 0) {
    if (isArrayMatch(searchKeywords, post.category)) {
      score += weights.category;
    }
  }

  // 抜粋での検索
  if (
    post.excerpt &&
    searchKeywords.some((keyword) => isPartialMatch(keyword, post.excerpt))
  ) {
    score += weights.excerpt;
  }

  // コンテンツでの検索
  if (
    post.content &&
    searchKeywords.some((keyword) => isPartialMatch(keyword, post.content))
  ) {
    score += weights.content;
  }

  // 著者での検索
  if (
    post.author &&
    searchKeywords.some((keyword) => isPartialMatch(keyword, post.author))
  ) {
    score += weights.author;
  }

  return score;
};

// 予算フィルタリング
const filterByBudget = (posts: Post[], budgetFilter: string): Post[] => {
  if (budgetFilter === "all") return posts;

  return posts.filter((post) => {
    if (!post.budget) return false;

    switch (budgetFilter) {
      case "10万円以下":
        return post.budget <= 100000;
      case "15万円以下":
        return post.budget <= 150000;
      case "20万円以下":
        return post.budget <= 200000;
      case "30万円以上":
        return post.budget >= 300000;
      default:
        return true;
    }
  });
};

// カテゴリフィルタリング
const filterByCategory = (
  posts: Post[],
  categoryFilter: string,
  pageType: string,
  categories: { id: string; name: string }[]
): Post[] => {
  if (categoryFilter === "all") return posts;

  const categoryName =
    categories.find((cat) => cat.id === categoryFilter)?.name || "";

  return posts.filter((post) => {
    if (pageType === "all") {
      // 全体検索の場合、記事のタイプまたはカテゴリでフィルタリング
      return (
        post.type === categoryFilter ||
        (post.category && post.category.includes(categoryName))
      );
    } else {
      // 特定のページタイプの場合、カテゴリでフィルタリング
      return post.category && post.category.includes(categoryName);
    }
  });
};

export const usePostFilters = ({
  basePosts,
  initialKeyword = "",
  initialCategory = "all",
  initialBudget = "all",
  syncWithUrl = false,
  pageTypeForTabs = "all",
}: UsePostFiltersParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getInitialState = useCallback(
    (key: string, defaultValue: string) => {
      return syncWithUrl ? searchParams.get(key) || defaultValue : defaultValue;
    },
    [searchParams, syncWithUrl]
  );

  const [keyword, setKeyword] = useState(() =>
    getInitialState("keyword", initialKeyword)
  );
  const [activeTab, setActiveTab] = useState(() =>
    getInitialState("category", initialCategory)
  );
  const [budget, setBudget] = useState(() =>
    getInitialState("budget", initialBudget)
  );

  // URL同期の処理
  useEffect(() => {
    if (syncWithUrl) {
      setKeyword(searchParams.get("keyword") || initialKeyword);
      setActiveTab(searchParams.get("category") || initialCategory);
      setBudget(searchParams.get("budget") || initialBudget);
    }
  }, [
    searchParams,
    syncWithUrl,
    initialKeyword,
    initialCategory,
    initialBudget,
  ]);

  const updateUrl = useCallback(
    (newParams: Record<string, string | undefined>) => {
      if (!syncWithUrl) return;

      const current = new URLSearchParams(Array.from(searchParams.entries()));
      Object.entries(newParams).forEach(([key, value]) => {
        if (value && value !== "all") {
          current.set(key, value);
        } else {
          current.delete(key);
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.replace(`${pathname}${query}`, { scroll: false });
    },
    [syncWithUrl, router, pathname, searchParams]
  );

  const handleKeywordChange = useCallback(
    (newKeyword: string) => {
      setKeyword(newKeyword);
      if (syncWithUrl) {
        updateUrl({ keyword: newKeyword || undefined });
      }
    },
    [syncWithUrl, updateUrl]
  );

  const handleTabChange = useCallback(
    (newTab: string) => {
      setActiveTab(newTab);
      if (syncWithUrl) {
        updateUrl({ category: newTab === "all" ? undefined : newTab });
      }
    },
    [syncWithUrl, updateUrl]
  );

  const handleBudgetChange = useCallback(
    (newBudget: string) => {
      setBudget(newBudget);
      if (syncWithUrl) {
        updateUrl({ budget: newBudget === "all" ? undefined : newBudget });
      }
    },
    [syncWithUrl, updateUrl]
  );

  const categoriesForTabs = useMemo(() => {
    switch (pageTypeForTabs) {
      case "diary":
        return diaryCategories;
      case "tourism":
        return tourismCategories;
      case "itinerary":
        return itineraryCategories;
      case "all":
      default:
        return defaultAllCategories;
    }
  }, [pageTypeForTabs]);

  // メインのフィルタリング処理
  const filteredPosts = useMemo(() => {
    const searchKeywords = normalizeSearchKeyword(keyword);

    // 1. キーワード検索とスコアリング
    const scoredPostsArray: scoredPosts[] = basePosts.map((post) => ({
      ...post,
      score: calculatePostScore(post, searchKeywords),
    }));

    // 2. スコアによるフィルタリング（キーワードが指定されている場合）
    const keywordFilteredPosts = scoredPostsArray.filter((post) => {
      if (searchKeywords.length > 0 && post.score === 0) {
        return false;
      }
      return true;
    });

    // 3. 予算フィルタリング
    const budgetFilteredPosts = filterByBudget(keywordFilteredPosts, budget);

    // 4. カテゴリフィルタリング
    const categoryFilteredPosts = filterByCategory(
      budgetFilteredPosts,
      activeTab,
      pageTypeForTabs,
      categoriesForTabs
    ) as scoredPosts[];

    // 5. スコアによるソート
    return categoryFilteredPosts.sort((a, b) => {
      if (searchKeywords.length > 0) {
        return (b.score ?? 0) - (a.score ?? 0);
      }
      // キーワードが指定されていない場合は日付順
      const dateA = new Date(a.dates[0]).getTime();
      const dateB = new Date(b.dates[0]).getTime();
      return dateB - dateA;
    });
  }, [
    keyword,
    activeTab,
    budget,
    basePosts,
    pageTypeForTabs,
    categoriesForTabs,
  ]);

  return {
    keyword,
    activeTab,
    budget,
    filteredPosts,
    categoriesForTabs,
    handleKeywordChange,
    handleTabChange,
    handleBudgetChange,
  };
};
