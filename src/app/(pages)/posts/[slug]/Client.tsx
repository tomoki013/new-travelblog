"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { slideFadeIn } from "@/components/animation";
import { Copy } from "lucide-react";
import { members } from "@/data/member";
import { Post } from "@/types/types";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import RelatedPosts from "@/components/featured/article/RelatedPosts";
import Index from "@/components/featured/article/Index";
import PostHeader from "@/components/featured/article/PostHeader";
import PostNavigation from "@/components/featured/article/PostNavigation";
import Button from "@/components/elements/Button";

import React from "react";

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
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const author = members.find((m) => m.name === post.author);

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${post.title} | ともきちの旅行日記`);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("クリップボードにコピーしました");
    });
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PostHeader post={post} />

        <Index />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideFadeIn()}
          className="max-w-none mt-12"
        >
          <article>{children}</article>
        </motion.div>

        <motion.footer
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideFadeIn()}
        >
          {/* --- Shared Components --- */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="font-semibold">Share:</span>
            <button
              onClick={shareOnTwitter}
              className="p-3 rounded-full text-foreground bg-primary-foreground hover:bg-gray-200 transition-colors"
              aria-label="Share on Twitter"
            >
              <FaTwitter size={20} />
            </button>
            <button
              onClick={shareOnFacebook}
              className="p-3 rounded-full text-foreground bg-primary-foreground hover:bg-gray-200 transition-colors"
              aria-label="Share on Facebook"
            >
              <FaFacebook size={20} />
            </button>
            <button
              onClick={copyUrlToClipboard}
              className="p-3 rounded-full text-foreground bg-primary-foreground hover:bg-gray-200 transition-colors relative"
              aria-label="Copy link"
            >
              <Copy size={20} />
            </button>
          </div>

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
