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
import { useMemo } from "react";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";
import { LinkCard } from "@/components/elements/LinkCard";
import { useSearchOverlay } from "@/hooks/useSearchOverlay";
import { SEARCH_CONFIG } from "@/constants/searchConfig";

// 型定義
type Suggestion = {
  title: string;
  slug: string;
};

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// アニメーション設定
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
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    toggleCategory,
    suggestions,
    isLoading,
    executeSearch,
    handleKeyDown,
  } = useSearchOverlay({ onClose });

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
              <p className="text-xs text-muted-foreground px-2">
                ヒント:
                「&quot;絶景&quot;」のように囲むとフレーズ検索、-除外したい単語
                も使えます。
              </p>

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
