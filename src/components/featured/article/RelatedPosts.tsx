"use client";

import { Post } from "@/types/types";
import PostCard from "@/components/elements/PostCard";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  slideInUpVariants,
} from "@/components/animation";

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainerVariants(0.1)}
    >
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left text-foreground">
        この地域の他の記事
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <motion.div key={post.slug} variants={slideInUpVariants}>
            <PostCard post={post} variant="relate" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedPosts;
