"use client";

import { useMemo } from "react";
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
  const categoryParam = searchParams.get("category") || "all";

  // URLを組み立てて遷移するヘルパー関数
  const navigate = (page: number, category: string) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (category && category !== "all") {
      params.set("category", category);
    }
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- イベントハンドラ ---

  // カテゴリー変更時の処理
  const handleCategoryChange = (slug: string) => {
    // カテゴリーを変更した際は1ページ目に戻す
    navigate(1, slug);
  };

  // ページ番号クリック時の処理
  const handlePageChange = (page: number) => {
    navigate(page, categoryParam);
  };

  // 前のページへ
  const handlePrev = () => {
    const prevPage = Math.max(1, currentPage - 1);
    navigate(prevPage, categoryParam);
  };

  // 次のページへ
  const handleNext = () => {
    const nextPage = Math.min(totalPages, currentPage + 1);
    navigate(nextPage, categoryParam);
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
        {/* ==================== Filters ==================== */}
        <section className="mb-12 flex flex-col sm:flex-row gap-4">
          <CustomSelect
            options={categories}
            value={categoryParam} // URLパラメータを直接参照
            onChange={handleCategoryChange}
            labelPrefix="カテゴリー"
          />
        </section>

        {/* ==================== Article List ==================== */}
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
