import { getRawPostsData, markdownToHtml } from './markdown';
import * as postFilters from './post-filters';
import { Post } from '@/types/types';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

// 1. Optionsの型を拡張
type GetPostsOptions = {
  slug?: string;
  tag?: string;
  series?: string;
  category?: string;
  limit?: number;
  excludeSlug?: string;
  navigationForSlug?: string; // 記事ナビゲーション用
  popular?: boolean;          // 人気記事用
};

// 2. 戻り値の型を拡張
type NavigationPosts = {
  prevPost: Post | null;
  nextPost: Post | null;
};

// これがプロジェクトで唯一利用する記事取得関数
export default async function getPosts(
  options: GetPostsOptions = {}
): Promise<Post | Post[] | NavigationPosts> { // 2. 戻り値の型を拡張
  // slugが指定されている場合は、単一の記事を返す
  if (options.slug) {
    const postsDirectory = path.join(process.cwd(), 'src/posts');
    const fullPath = path.join(postsDirectory, `${options.slug}.md`);

    if (!fs.existsSync(fullPath)) {
      // 適切なエラーハンドリング
      throw new Error(`Post not found for slug: ${options.slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const htmlContent = await markdownToHtml(content);

    return {
      slug: options.slug,
      ...data,
      tags: data.tags || [],
      category: data.category || [],
      content: htmlContent,
    } as Post;
  }

  // 3. 記事ナビゲーションのロジックを追加
  if (options.navigationForSlug) {
    const allPosts = postFilters.sortByDate(getRawPostsData());
    return postFilters.findNeighbors(allPosts, options.navigationForSlug);
  }

  // --- 複数記事取得のロジック ---
  let posts = getRawPostsData();

  // フィルタリング
  if (options.tag) {
    posts = postFilters.filterByTag(posts, options.tag);
  }
  if (options.series) {
    // `filterBySeries` が存在しないので、インラインでフィルタリングします。
    // TODO: あとで`post-filters.ts`に移動する
    posts = posts.filter(post => post.series === options.series);
  }
  if (options.category) {
    // `filterByCategory` が存在しないので、インラインでフィルタリングします。
    // TODO: あとで`post-filters.ts`に移動する
    posts = posts.filter(post => post.category && post.category.includes(options.category as string));
  }
  if (options.excludeSlug) {
    posts = posts.filter(post => post.slug !== options.excludeSlug);
  }


  // ソート (人気記事オプションを追加)
  let sortedPosts = postFilters.sortByDate(posts);
  if (options.popular) {
    // 現在は日付順を人気順としていますが、将来的に閲覧数などでソートする拡張が可能
    sortedPosts = postFilters.sortByDate(posts);
  }

  // 件数制限
  if (options.limit) {
    sortedPosts = sortedPosts.slice(0, options.limit);
  }

  return sortedPosts;
}
