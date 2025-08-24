import { Post } from "@/types/types";
import PostCard from "@/components/elements/PostCard";

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left text-foreground">
        この地域の他の記事
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="relate" />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
