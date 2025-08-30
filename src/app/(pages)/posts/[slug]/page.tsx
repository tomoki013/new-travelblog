import getPosts from "@/lib/posts";
import Client from "./Client";
import ArticleContent from "@/components/featured/article/Article";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Post } from "@/types/types";

// Define the type for the object returned by getPosts for navigation
type NavigationPosts = {
  prevPost: Post | null;
  nextPost: Post | null;
};

// 1. 静的パスを生成
export async function generateStaticParams() {
  const posts = (await getPosts()) as Post[];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. 動的にメタデータを生成
export async function generateMetadata(props: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = (await getPosts({ slug: props.params.slug })) as Post;

    return {
      title: post.title,
      description: post.excerpt,
      authors: post.author ? [{ name: post.author }] : [],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        images: post.image
          ? [
              {
                url: post.image,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ]
          : [],
      },
      twitter: {
        title: post.title,
        description: post.excerpt,
        images: post.image ? [post.image] : [],
      },
    };
  } catch (error) {
    return {
      title: "記事が見つかりませんでした",
      description: "指定された記事は存在しません。",
    };
  }
}

// 3. Pageコンポーネント
const PostPage = async (props: { params: { slug: string } }) => {
  const slug = props.params.slug;

  let post: Post;
  try {
    post = (await getPosts({ slug })) as Post;
  } catch (error) {
    return notFound();
  }

  // 関連記事を取得
  const relatedPosts = (await getPosts({
    series: post.series,
    excludeSlug: slug,
    limit: 3,
  })) as Post[];

  // 前後の記事ナビゲーションを取得
  const { prevPost, nextPost } = (await getPosts({
    navigationForSlug: slug,
  })) as NavigationPosts;

  const previousPost = prevPost
    ? {
        href: `/posts/${prevPost.slug}`,
        title: prevPost.title,
      }
    : undefined;

  const nextPostData = nextPost
    ? {
        href: `/posts/${nextPost.slug}`,
        title: nextPost.title,
      }
    : undefined;

  const allPosts = (await getPosts()) as Post[];

  return (
    <Client
      post={post}
      previousPost={previousPost}
      nextPost={nextPostData}
      relatedPosts={relatedPosts}
    >
      <ArticleContent
        content={post.content}
        currentPostType={post.type}
        allPosts={allPosts}
      />
    </Client>
  );
};

export default PostPage;
