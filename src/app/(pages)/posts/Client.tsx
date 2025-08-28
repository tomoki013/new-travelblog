"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Post } from "@/types/types";
import PostCard from "@/components/elements/PostCard";
import {
  staggerContainerVariants,
  slideInUpVariants,
} from "@/components/animation";
import { CustomSelect } from "@/components/elements/CustomSelect";
import { featuredSeries } from "@/data/series";
import { POSTS_PER_PAGE } from "@/constants/constants";
import { useSearchParams, useRouter } from "next/navigation";
import HeroSection from "@/components/sections/HeroSection";

// Propsの型を定義
interface BlogClientProps {
  allPosts: Post[];
}

// 絞り込み用の選択肢
const categories = [
  { slug: "all", title: "すべてのカテゴリー" },
  { slug: "tourism", title: "観光情報" },
  { slug: "itinerary", title: "旅程&費用レポート" },
];
// featuredSeriesの先頭に「すべてのシリーズ」を追加した新しい配列seriesを作成
const series = [{ slug: "all", title: "すべてのシリーズ" }, ...featuredSeries];

const BlogClient = ({ allPosts }: BlogClientProps) => {
  // URLパラメータからページ番号・カテゴリー・シリーズを取得
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get("page");
  // const categoryParam = searchParams.get("category");
  // const seriesParam = searchParams.get("series");
  const [currentPage, setCurrentPage] = useState(
    pageParam ? Number(pageParam) : 1
  );
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSeries, setFilterSeries] = useState("all");
  // ページ番号クリック時もスクロール＆URL更新（category, seriesも含める）
  const handlePageChange = async (page: number) => {
    await router.push(`?page=${page}`);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // ページ移動時にスクロール＆URL更新（category, seriesも含める）
  const handlePrev = async () => {
    const prevPage = Math.max(1, currentPage - 1);
    await router.push(`?page=${prevPage}`);
    setCurrentPage(prevPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleNext = async () => {
    const nextPage = Math.min(totalPages, currentPage + 1);
    await router.push(`?page=${nextPage}`);
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 絞り込みとソートのロジック
  const filteredAndSortedPosts = useMemo(() => {
    return allPosts
      .sort(
        (a, b) =>
          new Date(b.dates[0]).getTime() - new Date(a.dates[0]).getTime()
      )
      .filter(
        (post) => filterCategory === "all" || post.type === filterCategory
      )
      .filter((post) => filterSeries === "all" || post.series === filterSeries);
  }, [allPosts, filterCategory, filterSeries]); // allPostsも依存配列に追加

  // ページネーションのロジック
  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // ページネーション表示用ページ番号リスト生成
  const getPaginationNumbers = () => {
    if (totalPages <= 7) {
      // ページ数が少ない場合は全て表示
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: number[] = [];
    pages.push(1);
    // 前後2ページ分表示
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    if (start > 2) {
      // ...を表示
      pages.push(-1); // -1は省略記号
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages - 1) {
      pages.push(-1);
    }
    pages.push(totalPages);
    return pages;
  };

  // イベントハンドラ（フィルター変更時もURLパラメータ更新）
  const handleCategoryChange = (slug: string) => {
    // await router.push(`?page=1&category=${slug}&series=${filterSeries}`);
    setFilterCategory(slug);
    setCurrentPage(1);
  };

  const handleSeriesChange = (slug: string) => {
    // await router.push(`?page=1&category=${filterCategory}&series=${slug}`);
    setFilterSeries(slug);
    setCurrentPage(1);
  };

  // 以下、元のコンポーネントのJSXをそのまま貼り付け
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
            value={filterCategory}
            onChange={handleCategoryChange}
            labelPrefix="カテゴリー"
          />
          <CustomSelect
            options={series}
            value={filterSeries}
            onChange={handleSeriesChange}
            labelPrefix="シリーズ"
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
          {paginatedPosts.map((post, index) => (
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
        <section className="mt-16 flex flex-wrap justify-center items-center gap-2">
          {/* Prevボタン: 1ページ目では非表示 */}
          {currentPage !== 1 && (
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-lg bg-gray-200 text-black"
            >
              Prev
            </button>
          )}
          {/* ページ番号表示 */}
          {getPaginationNumbers().map((page, idx) =>
            page === -1 ? (
              <span key={"ellipsis-" + idx} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
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
          {/* Nextボタン: 最終ページでは非表示 */}
          {currentPage !== totalPages && (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-gray-200 text-black"
            >
              Next
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogClient;
