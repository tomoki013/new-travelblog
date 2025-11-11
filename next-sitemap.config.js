import fs from "fs";
import path from "path";
import matter from "gray-matter";

// lib/markdown.ts のロジックをこのファイル内に再現
const postsDirectory = path.join(process.cwd(), "src", "posts");

function getPostSlugs(type) {
  const typeDirectory = path.join(postsDirectory, type);
  if (!fs.existsSync(typeDirectory)) {
    return [];
  }
  return fs
    .readdirSync(typeDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function getPostBySlug(type, slug) {
  const fullPath = path.join(postsDirectory, type, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    type,
    dates: data.dates,
    author: data.author,
  };
}

function getAllPosts(type) {
  const slugs = getPostSlugs(type);
  return slugs.map((slug) => getPostBySlug(type, slug)).filter(Boolean);
}

function getAllPostTypes() {
  const postTypes = ["tourism", "itinerary", "series"];
  let allPosts = [];
  for (const type of postTypes) {
    allPosts = allPosts.concat(getAllPosts(type));
  }
  return allPosts;
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://travel.tomokichidiary.com/",
  changefreq: "weekly",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "./public",

  // 動的に追加したいパスをここで生成
  additionalPaths: async () => {
    const allPosts = getAllPostTypes();
    const results = [];

    // 各記事ページのパスを生成
    allPosts.forEach((post) => {
      if (post.slug && post.type && post.dates) {
        results.push({
          loc: `/posts/${post.slug}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: new Date(post.dates[0]).toISOString(),
        });
      }
    });

    return results;
  },
};

export default config;
