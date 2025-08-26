import { getAllPostTypes } from "@/lib/markdown";
import PostCard from "@/components/elements/PostCard";
import Button from "../elements/Button";

const NewPosts = () => {
  const posts = getAllPostTypes();
  return (
    <section className="py-24 px-6 md:px-8 max-w-5xl mx-auto">
      {/* セクションタイトル */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          New Posts
        </h2>
        {/* タイトル下のアクセントライン */}
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6"></div>
      </div>

      {/* 記事一覧 */}
      <div className="flex flex-col gap-16 md:gap-20 mb-12">
        {posts.slice(0, 3).map((post, index) => (
          <PostCard
            key={post.slug}
            post={post}
            isReversed={index % 2 !== 0}
            showMetadata={false}
          />
        ))}
      </div>

      {/* ボタン */}
      <Button href={`/posts`}>ブログ一覧を見る</Button>
    </section>
  );
};

export default NewPosts;
