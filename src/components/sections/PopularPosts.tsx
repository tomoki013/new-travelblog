import { getAllPostTypes } from "@/lib/markdown";
import PostCard from "@/components/elements/PostCard";

const PopularPosts = () => {
  const posts = getAllPostTypes();
  return (
    <section className="py-24 px-6 md:px-8 max-w-5xl mx-auto">
      {/* セクションタイトル */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          Popular Posts
        </h2>
        {/* タイトル下のアクセントライン */}
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6"></div>
      </div>

      {/* 記事一覧 */}
      <div className="flex flex-col gap-16 md:gap-20">
        {posts.slice(0, 2).map((post, index) => (
          <PostCard
            key={post.slug}
            post={post}
            isReversed={index % 2 !== 0} // 偶数番目と奇数番目でレイアウトを反転
            showMetadata={false} // メタデータを表示
          />
        ))}
      </div>
    </section>
  );
};

export default PopularPosts;
