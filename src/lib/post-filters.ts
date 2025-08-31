import { Post } from "@/types/types";

type PostMetadata = Omit<Post, "content">;

export function sortByDate(posts: PostMetadata[]): PostMetadata[] {
  return [...posts].sort((a, b) => {
    // bの日付からaの日付を引くことで、新しいものが先頭に来るようにする
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function filterByCategory(
  posts: PostMetadata[],
  category: string
): PostMetadata[] {
  return posts.filter((post) => post.category === category);
}

export function filterByTag(
  posts: PostMetadata[],
  tag: string
): PostMetadata[] {
  // `tags` is now guaranteed to be an array by the data layer.
  return posts.filter((post) => post.tags && post.tags.includes(tag));
}

export function getNextPost(
  slug: string,
  allPosts: PostMetadata[]
): PostMetadata | null {
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  if (currentIndex === -1 || currentIndex === 0) {
    return null; // No next post if it's the first one or not found
  }
  return allPosts[currentIndex - 1];
}

export function getPreviousPost(
  slug: string,
  allPosts: PostMetadata[]
): PostMetadata | null {
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  if (currentIndex === -1 || currentIndex === allPosts.length - 1) {
    return null; // No previous post if it's the last one or not found
  }
  return allPosts[currentIndex + 1];
}

export function getRegionPosts(
  posts: PostMetadata[],
  targetSlugs: string[]
): PostMetadata[] {
  return posts.filter(
    (post) =>
      post.location && post.location.some((loc) => targetSlugs.includes(loc))
  );
}
