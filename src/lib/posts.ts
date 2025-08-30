import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getRawPostsData } from './markdown';
import * as postFilters from './post-filters';
import { Post } from '@/types/types';
import { ensureStringArray } from '@/lib/utils';

type PostMetadata = Omit<Post, 'content'>;

type GetAllPostsOptions = {
  type?: string;
  tag?: string;
  limit?: number;
};

/**
 * Gets all post metadata and processes it based on options.
 */
export async function getAllPosts(options: GetAllPostsOptions = {}): Promise<PostMetadata[]> {
  let posts = getRawPostsData();

  if (options.type) {
    posts = postFilters.filterByType(posts, options.type);
  }
  if (options.tag) {
    posts = postFilters.filterByTag(posts, options.tag);
  }

  let sortedPosts = postFilters.sortByDate(posts);

  if (options.limit) {
    sortedPosts = sortedPosts.slice(0, options.limit);
  }

  return sortedPosts;
}

/**
 * Gets a single post data (including raw Markdown content) based on the slug.
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  // Check if the file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post with slug "${slug}" not found.`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    date: data.date,
    type: data.type,
    tags: ensureStringArray(data.tags),
    // Pass through other properties
    excerpt: data.excerpt,
    image: data.image,
    category: ensureStringArray(data.category),
    location: ensureStringArray(data.location),
    author: data.author,
    budget: data.budget,
    costs: data.costs,
    series: data.series,
  } as Post;
}
