"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";
import { LinkCard } from "@/components/elements/LinkCard";

// 型定義を分離
type Suggestion = {
  title: string;
  slug: string;
};

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// 定数を分離
const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 500,
  MAX_SUGGESTIONS: 3,
} as const;

const ANIMATION_CONFIG = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  modal: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
} as const;

/**
 * デバウンス関数 - ユーティリティとして分離
 */
function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: T): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * 検索API呼び出しのカスタムフック
 */
function useSearchSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < SEARCH_CONFIG.MIN_QUERY_LENGTH) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );

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

  const debouncedFetchSuggestions = useMemo(
    () => debounce(fetchSuggestions, SEARCH_CONFIG.DEBOUNCE_DELAY),
    [fetchSuggestions]
  );

  return {
    suggestions,
    isLoading,
    fetchSuggestions: debouncedFetchSuggestions,
    setSuggestions,
  };
}

/**
 * 検索処理のカスタムフック
 */
function useSearch(onClose: () => void) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    [executeSearch]
  );

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    toggleCategory,
    executeSearch,
    handleKeyDown,
  };
}

/**
 * カテゴリ選択コンポーネント
 */
const CategorySelector = ({
  selectedCategory,
  onCategoryToggle,
}: {
  selectedCategory: string | null;
  onCategoryToggle: (category: string) => void;
}) => {
  const availableCategories = useMemo(
    () => categories.filter((c) => c.slug !== "all"),
    []
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 font-heading">
        カテゴリを絞り込む
      </h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>カテゴリーを選択</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {availableCategories.map((category) => (
                <Button
                  key={category.slug}
                  variant={
                    selectedCategory === category.slug ? "default" : "outline"
                  }
                  onClick={() => onCategoryToggle(category.slug)}
                >
                  {category.title}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

/**
 * 検索候補表示コンポーネント
 */
const SearchSuggestions = ({
  searchTerm,
  suggestions,
  isLoading,
}: {
  searchTerm: string;
  suggestions: Suggestion[];
  isLoading: boolean;
}) => {
  const shouldShowSuggestions =
    searchTerm.length >= SEARCH_CONFIG.MIN_QUERY_LENGTH;
  const displayedSuggestions = suggestions.slice(
    0,
    SEARCH_CONFIG.MAX_SUGGESTIONS
  );

  if (!shouldShowSuggestions) return null;

  return (
    <div className="mt-4 bg-background border border-border rounded-lg shadow-lg">
      {isLoading && <LoadingAnimation variant="luggageCarousel" />}

      {!isLoading && displayedSuggestions.length > 0 && (
        <ul>
          {displayedSuggestions.map((post) => (
            <LinkCard
              key={post.slug}
              href={`/posts/${post.slug}`}
              title={post.title}
              variant="minimal"
            />
          ))}
        </ul>
      )}

      {!isLoading && suggestions.length === 0 && (
        <div className="p-4 text-muted-foreground">
          一致する記事は見つかりませんでした。
        </div>
      )}
    </div>
  );
};

/**
 * メインのSearchOverlayコンポーネント
 */
const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const { suggestions, isLoading, fetchSuggestions } = useSearchSuggestions();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    toggleCategory,
    executeSearch,
    handleKeyDown,
  } = useSearch(onClose);

  // 検索クエリが変更された時の処理
  useEffect(() => {
    if (searchTerm) {
      fetchSuggestions(searchTerm);
    }
  }, [searchTerm, fetchSuggestions]);

  // カテゴリが選択された時の処理
  useEffect(() => {
    if (selectedCategory) {
      fetchSuggestions(selectedCategory);
    }
  }, [selectedCategory, fetchSuggestions]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...ANIMATION_CONFIG.overlay}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            {...ANIMATION_CONFIG.modal}
            className="relative bg-background w-full max-w-2xl mx-auto mt-20 p-6 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-accent transition-colors"
              aria-label="検索を閉じる"
            >
              <XIcon className="h-6 w-6" />
            </button>

            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold font-heading">サイト内検索</h2>

              {/* キーワード検索 */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="キーワードを入力..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow"
                  autoFocus
                  aria-label="検索キーワード"
                />
                <Button onClick={executeSearch}>
                  <SearchIcon className="h-5 w-5 mr-2" />
                  検索
                </Button>
              </div>

              {/* カテゴリ検索 */}
              <CategorySelector
                selectedCategory={selectedCategory}
                onCategoryToggle={toggleCategory}
              />
            </div>

            {/* 検索候補 */}
            <SearchSuggestions
              searchTerm={searchTerm}
              suggestions={suggestions}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
