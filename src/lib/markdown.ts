import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/types";
import { ensureStringArray } from "@/lib/utils";

const postsDirectory = path.join(process.cwd(), "src/posts");

type PostMetadata = Omit<Post, "content">;

export function getRawPostsData(): PostMetadata[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      dates: ensureStringArray(data.dates),
      category: data.category,
      tags: ensureStringArray(data.tags),
      // Keep other metadata from frontmatter to avoid breaking other parts of the app immediately
      excerpt: data.excerpt,
      image: data.image,
      location: ensureStringArray(data.location),
      author: data.author,
      budget: data.budget,
      costs: data.costs,
      series: data.series,
      isPromotion: data.isPromotion,
    } as PostMetadata;
  });
  return allPostsData;
}
