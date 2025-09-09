import { useState, useEffect, useCallback, KeyboardEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "./useDebounce";
import { SEARCH_CONFIG } from "@/constants/searchConfig";

type Suggestion = {
  title: string;
  slug: string;
};

interface UseSearchOverlayProps {
  onClose: () => void;
}

export function useSearchOverlay({ onClose }: UseSearchOverlayProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(
    searchTerm,
    SEARCH_CONFIG.DEBOUNCE_DELAY,
  );

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < SEARCH_CONFIG.MIN_QUERY_LENGTH) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Suggestion[] = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("検索候補の取得に失敗しました:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // デバウンスされた検索語に基づいて候補をフェッチ
    if (debouncedSearchTerm) {
      fetchSuggestions(debouncedSearchTerm);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm, fetchSuggestions]);

  useEffect(() => {
    // カテゴリが選択されたときに候補をフェッチ
    if (selectedCategory) {
      fetchSuggestions(selectedCategory);
    }
  }, [selectedCategory, fetchSuggestions]);

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
    isLoading,
    executeSearch,
    handleKeyDown,
  };
}
