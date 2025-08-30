import { Post } from "@/types/types";

type PostMetadata = Omit<Post, "content">;

export function sortByDate(posts: PostMetadata[]): PostMetadata[] {
  return [...posts].sort((a, b) => {
    // bの日付からaの日付を引くことで、新しいものが先頭に来るようにする
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function filterByType(
  posts: PostMetadata[],
  type: string
): PostMetadata[] {
  return posts.filter((post) => post.type === type);
}

export function filterByTag(
  posts: PostMetadata[],
  tag: string
): PostMetadata[] {
  // `tags` is now guaranteed to be an array by the data layer.
  return posts.filter((post) => post.tags && post.tags.includes(tag));
}
