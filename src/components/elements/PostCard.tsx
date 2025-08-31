"use client";

import Image from "next/image";
import { Post } from "@/types/types";
import Link from "next/link";
type PostMetadata = Omit<Post, "content">;
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { featuredSeries } from "@/data/series";
import { FaGlobeAsia } from "react-icons/fa";
import { getValidRegionsBySlugs } from "@/lib/regionUtil";
import { categories } from "@/data/categories";

interface PostCardProps {
  post: PostMetadata;
  isReversed?: boolean;
  showMetadata?: boolean; // メタデータ表示を制御するprop
  variant?: "default" | "relate";
}

const PostCard = ({
  post,
  isReversed = false,
  showMetadata = true,
  variant = "default",
}: PostCardProps) => {
  const series = featuredSeries.find((s) => s.slug === post.series);

  const regionTags = getValidRegionsBySlugs(post.location || []);

  const category = categories.filter(
    (category) => category.slug === post.category
  );

  switch (variant) {
    case "default":
      return (
        <Link href={`/posts/${post.slug}`} className="block group">
          <article
            className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 rounded-md hover:shadow-lg dark:hover:shadow-white/20 transition-shadow duration-300 ${
              isReversed ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Imageセクション */}
            <div className="w-full md:w-1/2 relative">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-auto max-h-96 rounded-md object-cover"
                />
              )}
              {showMetadata && (
                <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/60 to-transparent rounded-b-lg pointer-events-none flex flex-col gap-2">
                  <div>
                    {series && (
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold rounded-full hover:bg-amber-200">
                        {series.title}
                      </span>
                    )}
                  </div>
                  <div>
                    {category &&
                      category.map((cat) => (
                        <span
                          key={cat.slug}
                          className="bg-teal-100 text-teal-700 px-3 py-1 text-xs font-semibold rounded-full hover:bg-teal-200 mr-1"
                        >
                          {cat.title}
                        </span>
                      ))}
                  </div>
                  <div className="text-white text-sm mt-1 flex items-center">
                    <Calendar className="inline mr-1.5" size={16} />
                    {post.date}
                  </div>
                </div>
              )}
            </div>

            {/* Contentセクション */}
            <div className="w-full md:w-1/2 text-center md:text-left text-foreground">
              {showMetadata && (
                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  {regionTags.map((r) => (
                    <p key={r.slug}>
                      <MapPin className="inline mr-0.5" size={16} />
                      {r.name}
                    </p>
                  ))}
                </div>
              )}
              <h3 className="font-heading text-3xl font-bold mb-4">
                {post.title}
              </h3>
              <p className="font-body leading-relaxed">{post.excerpt}</p>
              <span className="mt-4 text-teal-600 hover:text-teal-700 text-xl font-semibold inline-flex items-center">
                続きを読む
                <ArrowRight className="inline-block ml-2" size={20} />
              </span>
            </div>
          </article>
        </Link>
      );
    case "relate":
      return (
        <Link
          href={`/posts/${post.slug}`}
          className="group block border border-amber-50 bg-background rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative"
        >
          {/* ポストカードの画像部分 */}
          {post.image && (
            <div className="w-full">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={600}
                className="rounded-t-lg object-cover aspect-video"
              />
            </div>
          )}

          {/* 切手と消印 */}
          <div className="absolute top-4 left-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-white p-1 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <FaGlobeAsia className="text-teal-600 text-2xl" />
            </div>
            <div className="text-center text-xs text-muted-foreground">
              <p className="font-semibold group-hover:text-secondary">
                POST DATE
              </p>
              <p className="group-hover:text-secondary">{post.date}</p>
            </div>
          </div>

          {/* ポストカードのテキスト部分 */}
          <div className="p-4">
            {/* メインコンテンツ */}
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-secondary mb-2 min-h-[56px]">
                {post.title}
              </h3>
              {category &&
                category.map((cat) => (
                  <p
                    key={cat.slug}
                    className="text-sm text-muted-foreground mb-4 group-hover:text-secondary"
                  >
                    カテゴリー: {cat.title}
                  </p>
                ))}
              <p className="text-sm text-muted-foreground mb-4 group-hover:text-secondary">
                地域: {regionTags.map((r) => r.name).join(", ")}
              </p>
              <p className="font-semibold text-foreground text-right group-hover:text-secondary">
                続きを読む →
              </p>
            </div>
          </div>
        </Link>
      );
  }
};

export default PostCard;
