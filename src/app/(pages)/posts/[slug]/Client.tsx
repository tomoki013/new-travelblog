"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideFadeIn } from "@/components/common/animation";
import { members } from "@/data/member";
import { Post } from "@/types/types";
import RelatedPosts from "@/components/features/article/RelatedPosts";
import TableOfContent from "@/components/features/article/TableOfContent";
import PostHeader from "@/components/features/article/PostHeader";
import PostNavigation from "@/components/features/article/PostNavigation";
import Button from "@/components/common/Button";
import ShareButtons from "@/components/features/article/ShareButtons";
import AffiliateCard from "@/components/common/AffiliateCard";
import { affiliates } from "@/constants/affiliates";
import React from "react";
import CostBreakdown from "@/components/features/article/CostBreakdown";

interface ClientProps {
  children: React.ReactNode;
  post: Post;
  previousPost?: { href: string; title: string };
  nextPost?: { href: string; title: string };
  regionRelatedPosts?: Omit<Post, "content">[];
  previousCategoryPost?: { href: string; title: string };
  nextCategoryPost?: { href: string; title: string };
  previousSeriesPost?: { href: string; title: string };
  nextSeriesPost?: { href: string; title: string };
}

const Client = ({
  children,
  post,
  previousPost,
  nextPost,
  regionRelatedPosts,
  previousCategoryPost,
  nextCategoryPost,
  previousSeriesPost,
  nextSeriesPost,
}: ClientProps) => {
  const author = members.find((m) => m.name === post.author);

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PostHeader post={post} />

        {post.costs && <CostBreakdown costs={post.costs} />}

        <TableOfContent />

        <div className="max-w-none mt-12">
          <article>{children}</article>
        </div>

        {post.isPromotion && post.promotionPG && (
          <div className="my-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              この記事で紹介したサービス
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {affiliates
                .filter(
                  (affiliate) =>
                    post.promotionPG?.includes(affiliate.name) &&
                    affiliate.status === "ready"
                )
                .map((affiliate) => (
                  <AffiliateCard
                    key={affiliate.name}
                    affiliate={affiliate}
                    type={affiliate.type}
                  />
                ))}
            </div>
          </div>
        )}

        <motion.footer
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideFadeIn()}
        >
          {/* --- Shared Components --- */}
          <ShareButtons post={post} />

          {/* --- PC Layout --- */}
          <div className="hidden md:block space-y-12">
            {/* Area 1: Actions */}
            <div className="space-y-8">
              <PostNavigation
                previousPost={previousPost}
                nextPost={nextPost}
                previousCategoryPost={previousCategoryPost}
                nextCategoryPost={nextCategoryPost}
                previousSeriesPost={previousSeriesPost}
                nextSeriesPost={nextSeriesPost}
                series={post.series}
                category={post.category}
              />
            </div>
            {/* Area 2: Author & Content */}
            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg flex items-center gap-6">
                <Image
                  src={author?.image || "/favicon.ico"}
                  alt={author?.name || "ともきちの旅行日記"}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold">
                    {author?.name || "ともきちの旅行日記"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {author?.description || ""}
                  </p>
                  <Link
                    href="/about"
                    className="font-semibold text-teal-600 hover:text-teal-700"
                  >
                    プロフィール詳細へ →
                  </Link>
                </div>
              </div>
              {regionRelatedPosts && (
                <RelatedPosts posts={regionRelatedPosts} />
              )}
            </div>
            {/* Area 3: Monetization & Site Navigation */}
            <div className="space-y-8">
              {/* <div className="text-center p-8 border border-dashed rounded-lg">
                <p className="text-gray-500">広告（AdSenseなど）</p>
              </div> */}
              <div className="text-center">
                <Button href={`/posts`}>ブログ一覧へ</Button>
              </div>
            </div>
          </div>

          {/* --- Mobile Layout --- */}
          <div className="block md:hidden space-y-10">
            {/* Area 1: Share & Author */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg flex items-center gap-6">
              <Image
                src={author?.image || "/favicon.ico"}
                alt={author?.name || "ともきちの旅行日記"}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold">
                  {author?.name || "ともきちの旅行日記"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {author?.description || ""}
                </p>
                <Link
                  href="/about"
                  className="font-semibold text-teal-600 hover:text-teal-700"
                >
                  プロフィール詳細へ →
                </Link>
              </div>
            </div>
            {/* Area 2: Core Engagement */}
            {regionRelatedPosts && <RelatedPosts posts={regionRelatedPosts} />}
            {/* Area 3: Monetization & Navigation */}
            {/* <div className="text-center p-8 border border-dashed rounded-lg">
              <p className="text-gray-500">広告（AdSenseなど）</p>
            </div> */}
            <PostNavigation
              previousPost={previousPost}
              nextPost={nextPost}
              previousCategoryPost={previousCategoryPost}
              nextCategoryPost={nextCategoryPost}
              previousSeriesPost={previousSeriesPost}
              nextSeriesPost={nextSeriesPost}
              series={post.series}
              category={post.category}
            />
            <div className="text-center">
              <Button href={`/posts`}>ブログ一覧へ</Button>
            </div>
          </div>
        </motion.footer>

        {/* ==================== コメント欄 ==================== */}
        {/* <section className="mt-16">
          <div className="text-center border-2 border-dashed border-gray-300 p-10 rounded-lg">
            <p className="text-gray-500">
              将来的にはここにコメント機能が入ります
            </p>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default Client;
