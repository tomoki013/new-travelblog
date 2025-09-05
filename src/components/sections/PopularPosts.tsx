"use client";

import PostCard from "@/components/elements/PostCard";
import { motion } from "framer-motion";
import { sectionVariants, staggerContainer } from "@/components/animation";
import { Post } from "@/types/types";
type PostMetadata = Omit<Post, "content">;

interface PopularPostsProps {
  posts: PostMetadata[];
}

const PopularPosts = ({ posts }: PopularPostsProps) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      className="py-24 px-6 md:px-8 max-w-5xl mx-auto"
    >
      {/* セクションタイトル */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          Popular Posts
        </h2>
        {/* タイトル下のアクセントライン */}
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6"></div>
      </div>

      {/* 記事一覧 */}
      <motion.div
        className="flex flex-col gap-16 md:gap-20"
        variants={staggerContainer()}
      >
        {posts.slice(0, 2).map((post, index) => (
          <motion.div
            key={post.slug}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <PostCard
              post={post}
              isReversed={index % 2 !== 0} // 偶数番目と奇数番目でレイアウトを反転
              showMetadata={false} // メタデータを表示
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default PopularPosts;
