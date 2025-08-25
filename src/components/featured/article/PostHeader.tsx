"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import { getDatePrefix } from "@/lib/dateFormat";
import { Post } from "@/types/types";
import { featuredSeries } from "@/data/series";
import { getRegionPath, getRegionsBySlugs } from "@/lib/regionUtil";

interface PostHeaderProps {
  post: Post;
}

const PostHeader = ({ post }: PostHeaderProps) => {
  const series = featuredSeries.find((s) => s.slug === post.series);
  const regionTags = getRegionsBySlugs(post.location);
  const primarySlug = post.location.length > 0 ? post.location[0] : undefined;
  const regionPath = primarySlug ? getRegionPath(primarySlug) : [];
  const country = regionPath.length > 0 ? regionPath[0] : null;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Breadcrumbs */}
      <nav
        className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 mb-4"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-teal-600">
          ホーム
        </Link>
        {country && (
          <>
            <ChevronRight size={16} className="mx-1" />
            <Link
              href={`/destination/${country.slug}`}
              className="hover:text-teal-600"
            >
              {country.name}
            </Link>
          </>
        )}
        <ChevronRight size={16} className="mx-1" />
        <span className="truncate">{post.title}</span>
      </nav>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.category.map((cat) => (
          <Link
            key={cat}
            href={`/categories/${cat}`}
            className="bg-teal-100 text-teal-700 px-3 py-1 text-xs font-semibold rounded-full hover:bg-teal-200"
          >
            {cat}
          </Link>
        ))}
        {series && (
          <Link
            href={`/series/${series.slug}`}
            className="bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold rounded-full hover:bg-amber-200"
          >
            {series.title}
          </Link>
        )}
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>
      <div className="text-muted-foreground mb-6 flex justify-between items-center">
        <p>
          {getDatePrefix(post.type)}: {post.dates.join("～")}
        </p>
        <section className="flex flex-col md:flex-row md:items-center gap-2">
          {regionTags.map((r) => (
            <Link
              key={r.slug}
              href={`/destinations/${r.slug}`}
              className="hover:text-foreground"
            >
              <MapPin className="inline mr-0.5" size={16} />
              {r.name}
            </Link>
          ))}
        </section>
      </div>

      {/* Featured Image */}
      <Image
        src={post.image}
        alt={post.title}
        width={1200}
        height={675}
        className="w-full rounded-lg shadow-lg aspect-video object-cover"
        priority
      />
    </motion.header>
  );
};

export default PostHeader;
