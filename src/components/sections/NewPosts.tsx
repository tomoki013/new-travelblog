"use client";

import PostCard from "@/components/elements/PostCard";
import Button from "../elements/Button";
import { motion } from "framer-motion";
import { sectionVariants, staggerContainer } from "@/components/animation";
import { Post } from "@/types/types";
type PostMetadata = Omit<Post, "content">;

interface NewPostsProps {
  posts: PostMetadata[];
}

const NewPosts = ({ posts }: NewPostsProps) => {
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
          New Posts
        </h2>
        {/* タイトル下のアクセントライン */}
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6" />
      </div>

      {/* 記事一覧 */}
      <motion.div
        variants={staggerContainer()}
        className="flex flex-col gap-16 md:gap-20 mb-12"
      >
        {posts.slice(0, 3).map((post, index) => (
          <motion.div
            key={post.slug}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <PostCard
              post={post}
              isReversed={index % 2 !== 0}
              showMetadata={false}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ボタン */}
      <Button href={`/posts`}>ブログ一覧を見る</Button>
    </motion.section>
  );
};

export default NewPosts;
