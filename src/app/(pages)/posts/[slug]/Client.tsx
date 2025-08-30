"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideInUpVariants } from "@/components/animation";
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
  previousPost?: { href: string; title: string }; // 前の記事へのリンク
  nextPost?: { href: string; title: string }; // 次の記事へのリンク
  relatedPosts?: Omit<Post, "content">[];
}

const Client = ({
  children,
  post,
  previousPost,
  nextPost,
  relatedPosts,
}: ClientProps) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

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
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PostHeader post={post} />

        <Index />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInUpVariants}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-none mt-12"
        >
          <article>{children}</article>
        </motion.div>

        <motion.footer
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInUpVariants}
        >
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="font-semibold">Share:</span>
            <button
              onClick={shareOnTwitter}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Share on Twitter"
            >
              <FaTwitter size={20} />
            </button>
            <button
              onClick={shareOnFacebook}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Share on Facebook"
            >
              <FaFacebook size={20} />
            </button>
            <button
              onClick={copyUrlToClipboard}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
              aria-label="Copy link"
            >
              <Copy size={20} />
              {isCopied && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded">
                  Copied!
                </span>
              )}
            </button>
          </div>

          <PostNavigation previousPost={previousPost} nextPost={nextPost} />

          <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-6">
            <Image
              src={author?.image || "/favicon.ico"}
              alt={author?.name || "ともきちの旅行日記"}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-600">
                {author?.name || "ともきちの旅行日記"}
              </h3>
              <p className="text-gray-600 mb-2">{author?.description || ""}</p>
              <Link
                href="/about"
                className="font-semibold text-teal-600 hover:text-teal-700"
              >
                プロフィール詳細へ →
              </Link>
            </div>
          </div>

          {/* ==================== 関連記事セクション ==================== */}
          {relatedPosts && (
            <div className="mb-10">
              <RelatedPosts posts={relatedPosts} />
            </div>
          )}
        </motion.footer>

        {/* ブログ一覧へ戻る */}
        <Button href={`/posts`}>ブログ一覧へ</Button>

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
