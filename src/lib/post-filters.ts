import { Post } from '@/types/types';

type PostMetadata = Omit<Post, 'content'>;

export function sortByDate(posts: PostMetadata[]): PostMetadata[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function filterByType(posts: PostMetadata[], type: string): PostMetadata[] {
  return posts.filter(post => post.type === type);
}

export function filterByTag(posts: PostMetadata[], tag: string): PostMetadata[] {
  // `tags` is now guaranteed to be an array by the data layer.
  return posts.filter(post => post.tags && post.tags.includes(tag));
}

export function findNeighbors(
  posts: Post[],
  slug: string
): { prevPost: Post | null; nextPost: Post | null } {
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return { prevPost, nextPost };
}
