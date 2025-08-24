"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Region, Post } from "@/types/types";
import PostCard from "@/components/elements/PostCard";
import { sectionVariants } from "@/components/animation";

interface ClientProps {
  region: Region;
  seriesPosts: Post[];
  tourismPosts: Post[];
  itineraryPosts: Post[];
}

const Client = ({
  region,
  seriesPosts,
  tourismPosts,
  itineraryPosts,
}: ClientProps) => {
  return (
    <div>
      {/* ==================== Hero Section ==================== */}
      <section className="relative h-80 md:h-96 flex items-center justify-center text-white text-center">
        {/* 仮の画像。実際にはregionデータから動的に設定 */}
        <Image
          src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1920"
          alt={region.name}
          fill
          objectFit="cover"
          className="brightness-50"
          priority
        />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
            {region.slug} - {region.name}
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* ==================== イントロダクション ==================== */}
        <motion.section variants={sectionVariants}>
          <p className="text-lg text-center text-gray-700 leading-relaxed">
            {region.name}
            の旅で役立つ情報や、旅の記録をまとめました。あなたの次の冒険の参考にしてください。
          </p>
        </motion.section>

        {/* ==================== 関連シリーズセクション (最上部に移動) ==================== */}
        {seriesPosts.length > 0 && (
          <motion.section variants={sectionVariants}>
            <h2 className="text-3xl font-bold text-center mb-8">
              この地域が登場するシリーズ記事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {seriesPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isReversed={index % 2 !== 0}
                  showMetadata
                  variant="relate"
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* ==================== 観光情報セクション ==================== */}
        {tourismPosts.length > 0 && (
          <motion.section variants={sectionVariants}>
            <h2 className="text-3xl font-bold text-center mb-8">
              観光情報 - Tourist Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tourismPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isReversed={index % 2 !== 0}
                  showMetadata
                  variant="relate"
                />
              ))}
            </div>
            {/* <div className="text-center mt-8">
              <Link
                href="#"
                className="font-semibold text-teal-600 hover:text-teal-700"
              >
                このカテゴリーの記事をもっと見る →
              </Link>
            </div> */}
          </motion.section>
        )}

        {/* ==================== 旅程&費用セクション ==================== */}
        {itineraryPosts.length > 0 && (
          <motion.section variants={sectionVariants}>
            <h2 className="text-3xl font-bold text-center mb-8">
              旅程&費用 - Itinerary & Cost
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {itineraryPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isReversed={index % 2 !== 0}
                  showMetadata
                  variant="relate"
                />
              ))}
            </div>
            {/* <div className="text-center mt-8">
              <Link
                href="#"
                className="font-semibold text-teal-600 hover:text-teal-700"
              >
                このカテゴリーの記事をもっと見る →
              </Link>
            </div> */}
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default Client;
