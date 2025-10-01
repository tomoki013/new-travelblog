import { useState, useEffect, useCallback, KeyboardEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "./useDebounce";
import { SEARCH_CONFIG } from "@/constants/searchConfig";

type Suggestion = {
  title: string;
  slug: string;
};

// APIレスポンスの型を定義
type SearchApiResponse = {
  suggestions: Suggestion[];
  total: number;
};

interface UseSearchOverlayProps {
  onClose: () => void;
}

export function useSearchOverlay({ onClose }: UseSearchOverlayProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [totalResults, setTotalResults] = useState<number | null>(null); // 総件数を保持するstate
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(
    searchTerm,
    SEARCH_CONFIG.DEBOUNCE_DELAY,
  );

  const fetchSuggestions = useCallback(
    async (query: string, category: string | null) => {
      // 検索語が不十分で、かつカテゴリも未選択の場合はリセット
      if (query.length < SEARCH_CONFIG.MIN_QUERY_LENGTH && !category) {
        setSuggestions([]);
        setTotalResults(null);
        return;
      }

      setIsLoading(true);
      setTotalResults(null); // 検索開始時にリセット

      try {
        const params = new URLSearchParams();
        if (query) {
          params.append("q", query);
        }
        if (category) {
          params.append("category", category);
        }

        const response = await fetch(`/api/search?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SearchApiResponse = await response.json();
        setSuggestions(data.suggestions);
        setTotalResults(data.total);
      } catch (error) {
        console.error("検索候補の取得に失敗しました:", error);
        setSuggestions([]);
        setTotalResults(0); // エラー時は0件とする
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    // 検索語かカテゴリが有効な場合に候補をフェッチ
    if (
      debouncedSearchTerm.length >= SEARCH_CONFIG.MIN_QUERY_LENGTH ||
      selectedCategory
    ) {
      fetchSuggestions(debouncedSearchTerm, selectedCategory);
    } else {
      setSuggestions([]);
      setTotalResults(null);
    }
  }, [debouncedSearchTerm, selectedCategory, fetchSuggestions]);

  const executeSearch = useCallback(() => {
    const trimmedSearchTerm = searchTerm.trim();
    if (!trimmedSearchTerm && !selectedCategory) {
      onClose();
      return;
    }

    const searchParams = new URLSearchParams();
    if (trimmedSearchTerm) {
      searchParams.append("search", trimmedSearchTerm);
    }
    if (selectedCategory) {
      searchParams.append("category", selectedCategory);
    }

    router.push(`/posts?${searchParams.toString()}`);
    onClose();
  }, [searchTerm, selectedCategory, router, onClose]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === "Enter") {
        executeSearch();
      }
    },
    [executeSearch],
  );

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    toggleCategory,
    suggestions,
    totalResults,
    isLoading,
    executeSearch,
    handleKeyDown,
  };
}
