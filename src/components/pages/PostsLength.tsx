"use client";

import { motion } from "framer-motion";
import { sectionVariants } from "@/components/common/animation";
import { PostMetadata } from "@/types/types";
import Button from "../common/Button";

interface PostsLengthProps {
  posts: PostMetadata[];
}

const PostsLength = ({ posts }: PostsLengthProps) => {
  const postsLength = posts.length;
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      className="py-24 px-6 md:px-8 max-w-5xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          I have posts.
        </h2>
        {/* タイトル下のアクセントライン */}
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6" />
      </div>
      <div className="text-center mt-8">
        <p className="text-xl md:text-2xl font-bold">
          <span className="text-3xl md:text-4xl text-primary font-extrabold">
            {postsLength}
          </span>
        </p>
      </div>
      <Button href={`/posts`}>ブログ一覧へ</Button>
    </motion.section>
  );
};

export default PostsLength;
