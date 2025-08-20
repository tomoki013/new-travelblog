"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Post, Series } from "@/types/types";
import { Badge } from "@/components/ui/badge";

interface SeriesPageProps {
  allPosts: Post[];
  series: Series;
}

const POSTS_PER_PAGE = 3;

const Client = ({ allPosts, series }: SeriesPageProps) => {
  // URLパラメータからページ番号を取得
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(
    pageParam ? Number(pageParam) : 1
  );
  // ページ番号クリック時もスクロール＆URL更新
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // ページ移動時にスクロール＆URL更新
  const handlePrev = () => {
    const prevPage = Math.max(1, currentPage - 1);
    setCurrentPage(prevPage);
    router.push(`?page=${prevPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleNext = () => {
    const nextPage = Math.min(totalPages, currentPage + 1);
    setCurrentPage(nextPage);
    router.push(`?page=${nextPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ページネーションのロジック
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = allPosts.slice(
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

  return (
    <main>
      {/* ==================== Hero Section ==================== */}
      <section className="relative h-72 md:h-96 flex items-center justify-center text-white text-center">
        <Image
          src={series.imageUrl}
          alt={series.title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />
        <div className="relative z-10 p-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            SERIES: {series.title}
          </h1>
          <p className="text-md md:text-lg mt-4 max-w-2xl">
            {series.description}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ==================== Article List ==================== */}
        <section className="space-y-16">
          {paginatedPosts.map((post, index) => {
            const motionProps =
              index === 0
                ? {
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.8 },
                  }
                : {
                    initial: { opacity: 0, y: 50 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.8 },
                  };
            return (
              <motion.article
                key={post.id}
                {...motionProps}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 画像エリア: position-relative を追加 */}
                <div className="w-full md:w-1/2 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="rounded-lg shadow-lg object-cover w-full aspect-[4/3]"
                  />
                  {/* 画像の上に表示する情報 */}
                  <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
                    {post.series && (
                      <Badge variant="secondary">{series.title}</Badge>
                    )}
                    <div className="my-1">
                      <Badge variant="secondary">
                        {post.category.map((c) => (
                          <span key={c} className="mr-1">
                            {c}
                          </span>
                        ))}
                      </Badge>
                    </div>
                    <div className="text-white text-sm mt-1 flex items-center">
                      <Calendar className="inline mr-1.5" size={16} />
                      {post.dates.join("～")}
                    </div>
                  </div>
                </div>

                {/* テキストエリア: メタ情報がなくなりスッキリ */}
                <div className="w-full md:w-1/2">
                  {/* 場所などの補足情報はタイトル下にあっても良い */}
                  <div className="text-sm text-muted-foreground mb-2 flex items-center">
                    <MapPin className="inline mr-1.5" size={16} />
                    {post.location.join(", ")}
                  </div>

                  <h2 className="text-2xl font-bold mb-3 text-foreground">
                    {post.title}
                  </h2>
                  <p className="text-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="font-semibold text-teal-600 hover:text-teal-700"
                  >
                    続きを読む →
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </section>

        {/* ==================== Pagination ==================== */}
        <section className="mt-16 flex justify-center items-center gap-2">
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

        {/* ==================== Back to Series Index ==================== */}
        <section className="mt-16 text-center">
          <Link
            href="/series"
            className="inline-block px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors"
          >
            ← すべてのシリーズ一覧へ戻る
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Client;
