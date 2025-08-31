"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Post } from "@/types/types";
import PostCard from "@/components/elements/PostCard";
import {
  staggerContainerVariants,
  slideInUpVariants,
} from "@/components/animation";
import { CustomSelect } from "@/components/elements/CustomSelect";
import { useSearchParams, useRouter } from "next/navigation";
import HeroSection from "@/components/sections/HeroSection";
import { categories } from "@/data/categories";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/components/Icons";

// Postのメタデータの型を定義
type PostMetadata = Omit<Post, "content">;

// Propsの型を定義
interface BlogClientProps {
  posts: PostMetadata[]; // 表示するページ分割済みの記事
  totalPages: number; // 総ページ数
  currentPage: number; // 現在のページ番号
}

const BlogClient = ({ posts, totalPages, currentPage }: BlogClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URLパラメータを取得
  const categoryParam = searchParams.get("category") || "all";
  const searchParam = searchParams.get("search") || "";

  // 検索フォームの入力状態を管理
  const [searchQuery, setSearchQuery] = useState(searchParam);

  // URLパラメータが変更されたら、フォームの入力値を更新
  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  // URLを組み立てて遷移するヘルパー関数 (searchも扱うように修正)
  const navigate = (page: number, category: string, search: string) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (category && category !== "all") {
      params.set("category", category);
    }
    if (search) {
      params.set("search", search);
    }
    router.push(`?${params.toString()}`);
    // ページ上部へのスクロールはここでは不要な場合があるため、各ハンドラで制御
  };

  // --- イベントハンドラ ---

  // 検索フォーム送信時の処理
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルト送信をキャンセル
    navigate(1, categoryParam, searchQuery); // 検索時は1ページ目に戻す
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (slug: string) => {
    navigate(1, slug, searchParam); // カテゴリ変更時も1ページ目に戻す
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (page: number) => {
    navigate(page, categoryParam, searchParam);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    navigate(Math.max(1, currentPage - 1), categoryParam, searchParam);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    navigate(Math.min(totalPages, currentPage + 1), categoryParam, searchParam);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- ページネーション番号の生成ロジック (useMemoで不要な再計算を防ぐ) ---
  const paginationNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  }, [totalPages, currentPage]);

  // --- JSX ---
  return (
    <div>
      {/* ==================== Hero Section ==================== */}
      <HeroSection
        src="/images/Spain/toledo-view.jpg"
        alt="Blog Hero Image"
        pageTitle="BLOG"
        pageMessage="旅の記録を、時系列で"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ==================== Search ==================== */}
        <section className="mb-2">
          <form onSubmit={handleSearchSubmit} className="flex-grow">
            <div className="relative">
              <Input
                type="search"
                placeholder="キーワードで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10" // アイコンのスペースを確保
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </form>
        </section>

        {/* ==================== Filters ==================== */}
        <section className="mb-12">
          <CustomSelect
            options={categories}
            value={categoryParam}
            onChange={handleCategoryChange}
            labelPrefix="カテゴリー"
          />
        </section>

        {/* ==================== Article List ==================== */}
        {posts.length > 0 ? (
          <motion.section
            key={currentPage} // ページが変わるたびにアニメーションを再トリガー
            variants={staggerContainerVariants(0.1)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-16 md:gap-20 mb-12"
          >
            {posts.map((post, index) => (
              <motion.div key={post.slug} variants={slideInUpVariants}>
                <PostCard
                  post={post}
                  isReversed={index % 2 !== 0}
                  showMetadata={true}
                />
              </motion.div>
            ))}
          </motion.section>
        ) : (
          // 検索結果がない場合の表示
          <div className="text-center py-16">
            <p className="text-xl text-foreground">
              該当する記事が見つかりませんでした。
            </p>
          </div>
        )}

        {/* ==================== Pagination ==================== */}
        {totalPages > 1 && (
          <section className="mt-16 flex flex-wrap justify-center items-center gap-2">
            {/* Prevボタン */}
            {currentPage > 1 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-lg bg-gray-200 text-black"
              >
                Prev
              </button>
            )}

            {/* ページ番号 */}
            {paginationNumbers.map((page, idx) =>
              page === "..." ? (
                <span key={`ellipsis-${idx}`} className="px-2">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page as number)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Nextボタン */}
            {currentPage < totalPages && (
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-gray-200 text-black"
              >
                Next
              </button>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogClient;
