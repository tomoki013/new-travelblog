"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Region, Post } from "@/types/types";
import PostCard from "@/components/elements/PostCard";
import { sectionVariants } from "@/components/animation";
import { Wind } from "lucide-react";
import AllDestination, {
  AllDestinationProps,
} from "@/components/featured/destination/allDestination";

interface ClientProps extends AllDestinationProps {
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
  regionsData,
}: ClientProps) => {
  const noPosts =
    seriesPosts.length === 0 &&
    tourismPosts.length === 0 &&
    itineraryPosts.length === 0;

  return (
    <div>
      {/* ==================== Hero Section ==================== */}
      <section className="relative h-80 md:h-96 flex items-center justify-center text-white text-center">
        <Image
          src={region.imageURL}
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {noPosts ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 md:p-12"
          >
            <div className="flex justify-center mb-4">
              <Wind className="w-16 h-16 text-slate-400" strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-bold text-slate-700">
              まだ何もない場所
            </h3>
            <p className="mt-2 text-slate-500 max-w-md mx-auto">
              この地域に関する記事は現在準備中です。
              <br />
              新しい冒険の記録が追加されるのをお楽しみに！
            </p>
          </motion.div>
        ) : (
          <div className="space-y-16">
            {/* ==================== イントロダクション ==================== */}
            <motion.section variants={sectionVariants}>
              <p className="text-lg text-center text-gray-700 leading-relaxed">
                {region.name}
                の旅で役立つ情報や、旅の記録をまとめました。あなたの次の冒険の参考にしてください。
              </p>
            </motion.section>

            {/* ==================== 関連シリーズセクション ==================== */}
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
              </motion.section>
            )}
          </div>
        )}
      </div>
      <div className="mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AllDestination regionsData={regionsData} />
      </div>
    </div>
  );
};

export default Client;
