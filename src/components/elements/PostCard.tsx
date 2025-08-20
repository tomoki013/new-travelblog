"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Post } from "@/types/types";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { featuredSeries } from "@/data/series";

interface PostCardProps {
  post: Post;
  isReversed?: boolean;
  showMetadata?: boolean; // メタデータ表示を制御するprop
}

const PostCard = ({
  post,
  isReversed = false,
  showMetadata = true,
}: PostCardProps) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const series = featuredSeries.find((s) => s.slug === post.series);

  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <motion.article
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={itemVariants}
        className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 rounded-md hover:shadow-lg transition-shadow duration-300 ${
          isReversed ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Imageセクション */}
        <div className="w-full md:w-1/2 relative">
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-auto max-h-96 rounded-md object-cover"
          />
          {showMetadata && (
            <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/60 to-transparent rounded-b-lg pointer-events-none">
              {series && (
                <span className="bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold rounded-full hover:bg-amber-200">
                  {series.title}
                </span>
              )}
              <div className="my-1">
                {post.category.map((cat) => (
                  <span
                    key={cat}
                    className="bg-teal-100 text-teal-700 px-3 py-1 text-xs font-semibold rounded-full hover:bg-teal-200 mr-1"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <div className="text-white text-sm mt-1 flex items-center">
                <Calendar className="inline mr-1.5" size={16} />
                {post.dates.join("～")}
              </div>
            </div>
          )}
        </div>

        {/* Contentセクション */}
        <div className="w-full md:w-1/2 text-center md:text-left text-foreground">
          {showMetadata && (
            <div className="text-sm text-muted-foreground mb-2 flex items-center">
              <MapPin className="inline mr-1.5" size={16} />
              {post.location.join(", ")}
            </div>
          )}
          <h3 className="font-heading text-3xl font-bold mb-4">{post.title}</h3>
          <p className="font-body leading-relaxed">{post.excerpt}</p>
          <span className="mt-4 text-teal-600 hover:text-teal-700 text-xl font-semibold inline-flex items-center">
            続きを読む
            <ArrowRight className="inline-block ml-2" size={20} />
          </span>
        </div>
      </motion.article>
    </Link>
  );
};

export default PostCard;
