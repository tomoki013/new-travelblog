"use client";

import Image from "next/image";
import { Post } from "@/types/types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type PostMetadata = Omit<Post, "content">;

interface PostCardProps {
  post: PostMetadata;
  // isReversed and showMetadata are kept for compatibility but ignored in new design
  isReversed?: boolean;
  showMetadata?: boolean;
  variant?: "default" | "relate";
}

const PostCard = ({ post, variant = "default" }: PostCardProps) => {
  // Use the new design for both variants for now, or keep "relate" separate if needed.
  // The user request specifically showed a vertical card design.
  // Assuming this replaces the "default" variant.

  if (variant === "relate") {
    // Keep existing relate variant or update if needed.
    // For now, I will focus on the default variant as requested.
    // But looking at the user request, they want to change the style of blog posts.
    // Let's apply the new design to the default variant.
  }

  return (
    <Link href={`/posts/${post.slug}`} className="block group h-full">
      <article className="flex flex-col group cursor-pointer h-full p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
        <div className="overflow-hidden rounded-xl mb-4 relative aspect-[16/10] shadow-sm border border-slate-50">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          )}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-slate-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-400 font-medium">
              {post.dates.join(" ~ ")}
            </span>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-1 group-hover:underline">
              続きを読む <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
