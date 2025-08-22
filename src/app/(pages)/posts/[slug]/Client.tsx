"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Copy, MapPin } from "lucide-react";
import { getDatePrefix } from "@/lib/dateFormat";
import { members } from "@/data/member";
import { Post } from "@/types/types";
import { featuredSeries } from "@/data/series";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { getRegionPath, getRegionsBySlugs } from "@/lib/regionUtil";

interface ClientProps {
  children: React.ReactNode;
  post: Post;
  previousPost?: { href: string; title: string }; // 前の記事へのリンク
  nextPost?: { href: string; title: string }; // 次の記事へのリンク
}

const Client = ({ children, post, previousPost, nextPost }: ClientProps) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // ページが読み込まれた際に、現在のURLを取得
  useEffect(() => {
    // windowオブジェクトが利用可能な場合にのみ実行
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const author = members.find((m) => m.name === post.author);
  const series = featuredSeries.find((s) => s.slug === post.series);

  // Twitterでシェアする
  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${post.title} | ともきちの旅行日記`);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
  };

  // Facebookでシェアする
  const shareOnFacebook = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  // URLをクリップボードにコピーする
  const copyUrlToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setIsCopied(true);
        // 2秒後に「Copied!」の表示を消す
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("URLのコピーに失敗しました: ", err);
      });
  };

  const regionTags = getRegionsBySlugs(post.location);
  const primarySlug = post.location.length > 0 ? post.location[0] : undefined;
  const regionPath = primarySlug ? getRegionPath(primarySlug) : [];
  const country = regionPath.length > 0 ? regionPath[0] : null;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ==================== 記事タイトルエリア ==================== */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* パンくずリスト */}
          <nav
            className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 mb-4"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-teal-600">
              ホーム
            </Link>
            <ChevronRight size={16} className="mx-1" />
            {country && (
              <Link
                href={`/destination/${country.slug}`}
                className="hover:text-teal-600"
              >
                {country.name}
              </Link>
            )}
            <ChevronRight size={16} className="mx-1" />
            <span className="truncate">{post.title}</span>
          </nav>

          {/* メタ情報 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.category.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat}`}
                className="bg-teal-100 text-teal-700 px-3 py-1 text-xs font-semibold rounded-full hover:bg-teal-200"
              >
                {cat}
              </Link>
            ))}
            {series && (
              <Link
                href={`/series/${series.slug}`}
                className="bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold rounded-full hover:bg-amber-200"
              >
                {series.title}
              </Link>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="text-muted-foreground mb-6 flex justify-between items-center">
            <p>
              {getDatePrefix(post.type)}: {post.dates.join("～")}
            </p>
            <section className="flex flex-col md:flex-row md:items-center gap-2">
              {regionTags.map((r) => (
                <Link
                  key={r.slug}
                  href={`/destinations/${r.slug}`}
                  className="hover:text-foreground"
                >
                  <MapPin className="inline mr-0.5" size={16} />
                  {r.name}
                </Link>
              ))}
            </section>
          </div>

          {/* アイキャッチ画像 */}
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={675}
            className="w-full rounded-lg shadow-lg aspect-video object-cover"
            priority
          />
        </motion.header>

        {/* ==================== 記事本文エリア ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none mt-12"
        >
          <article>{children}</article>
        </motion.div>

        {/* ==================== 記事フッターエリア ==================== */}
        <motion.footer
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* SNSシェアボタン */}
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

          <div className="flex justify-center items-center mb-10">
            <Link
              href={`/posts`}
              className="text-foreground hover:text-secondary"
            >
              ブログ一覧へ
            </Link>
          </div>

          {/* シリーズナビゲーション */}
          <div className="flex justify-between border-y border-gray-200 py-6 mb-10">
            {nextPost ? (
              <Link
                href={nextPost.href}
                className="text-gray-600 hover:text-teal-600 max-w-[45%]"
              >
                <span className="text-sm">« 次の記事へ</span>
                <p className="font-semibold truncate">{nextPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
            {previousPost ? (
              <Link
                href={previousPost.href}
                className="text-gray-600 hover:text-teal-600 max-w-[45%] text-right"
              >
                <span className="text-sm">前の記事へ »</span>
                <p className="font-semibold truncate">{previousPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* 著者プロフィール */}
          <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-6">
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
              <p className="text-gray-600 mb-2">{author?.description || ""}</p>
              <Link
                href="/about"
                className="font-semibold text-teal-600 hover:text-teal-700"
              >
                プロフィール詳細へ →
              </Link>
            </div>
          </div>
        </motion.footer>

        {/* ==================== 関連記事セクション ==================== */}
        {/* <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            この地域の他の記事
          </h2>
          <div className="text-center bg-gray-100 p-10 rounded-lg">
            関連記事カードがここに表示されます
          </div>
        </motion.section> */}

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
