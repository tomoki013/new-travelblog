import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostType } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const postsDirectory = path.join(process.cwd(), "src/posts");

export function getPostSlugs(type: PostType): string[] {
  const typeDirectory = path.join(postsDirectory, type);
  return fs
    .readdirSync(typeDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(postType: PostType, postSlug: string): Post {
  const fullPath = path.join(postsDirectory, postType, `${postSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // id自動生成（uuid）
  const id = uuidv4();

  return {
    id,
    slug: postSlug,
    title: data.title,
    dates: Array.isArray(data.dates) ? data.dates : [data.dates], // 配列に変換
    content,
    excerpt: data.excerpt,
    image: data.image,
    category:
      typeof data.category === "string"
        ? data.category.split(",").map((c) => c.trim())
        : [], // 文字列なら配列に変換
    location: Array.isArray(data.location) ? data.location : [data.location], // 配列に変換
    author: data.author,
    tags: data.tags || [],
    budget: data.budget,
    costs: data.costs || {},
    type: postType, // フォルダに基づいてtypeを設定
    series: data.series ?? "", // seriesが未定義なら空文字
  };
}

export default function getAllPosts(type: PostType): Post[] {
  const slugs = getPostSlugs(type);
  const posts = slugs
    .map((slug) => getPostBySlug(type, slug))
    .sort((a, b) => {
      const dateA = new Date(a.dates[0]).getTime(); // 配列の最初の要素を使用
      const dateB = new Date(b.dates[0]).getTime(); // 配列の最初の要素を使用
      if (dateA === dateB) {
        return b.dates.length - a.dates.length; // 配列の長さで比較
      }
      return dateB - dateA;
    });
  return posts;
}

export function getAllPostTypes(): Post[] {
  const diaryPosts = getAllPosts("diary");
  const tourismPosts = getAllPosts("tourism");
  const itineraryPosts = getAllPosts("itinerary");
  const seriesPosts = getAllPosts("series");
  const allPosts = [
    ...diaryPosts,
    ...tourismPosts,
    ...itineraryPosts,
    ...seriesPosts,
  ];

  return allPosts.sort((a, b) => {
    const dateA = new Date(a.dates[0]).getTime();
    const dateB = new Date(b.dates[0]).getTime();
    if (dateA === dateB) {
      return b.dates.length - a.dates.length; // 配列の長さで比較
    }
    return dateB - dateA;
  });
}
