"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Post } from "@/types/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PostItemProps {
  post: Post;
  isReversed: boolean; // レイアウトを反転させるためのprop
}

const PostItem = ({ post, isReversed }: PostItemProps) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group relative flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 rounded-md hover:shadow-lg transition-shadow duration-300"
    >
      <motion.div
        className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
          isReversed ? "md:flex-row-reverse" : ""
        }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // 画面に10%入ったら一回だけ実行
        variants={itemVariants}
      >
        {/* Imageセクション */}
        <div className="w-full md:w-1/2">
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-auto max-h-96 rounded-md object-cover"
          />
        </div>
        {/* Contentセクション */}
        <div className="w-full md:w-1/2 text-center md:text-left text-foreground">
          <h3 className="font-heading text-3xl font-bold mb-4">{post.title}</h3>
          <p className="font-body leading-relaxed">{post.excerpt}</p>
          <p className="mt-4 text-teal-600 hover:text-teal-700 text-xl font-semibold">
            続きを読む
            <ArrowRight className="inline-block ml-2" size={20} />
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default PostItem;
