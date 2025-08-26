import {
  getAllPostTypes,
  getPostBySlug,
  getSlugToCategoryMap,
} from "@/lib/markdown";
import Client from "./Client";
import ArticleContent from "@/components/featured/article/Article";
import { Metadata } from "next";
import { getRelatedPosts } from "@/lib/getPostData";
import { notFound } from "next/navigation";

// 1. 静的パスを生成
export async function generateStaticParams() {
  const posts = getAllPostTypes();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const slugToCategoryMap = getSlugToCategoryMap();

// 2. 動的にメタデータを生成
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  const category = slugToCategoryMap.get(slug);

  if (!category) {
    return {
      title: "記事が見つかりませんでした",
      description: "指定された記事は存在しません。",
    };
  }
  const post = getPostBySlug(category, slug);

  if (!post) {
    return {
      title: "記事が見つかりませんでした",
      description: "指定された記事は存在しません。",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

// 3. Pageコンポーネント
const PostPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const slug = params.slug;
  const category = slugToCategoryMap.get(slug);

  if (!category) {
    return notFound();
  }

  const post = getPostBySlug(category, slug);
  if (!post) {
    return notFound();
  }

  const allPosts = getAllPostTypes();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPostData = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const previousPostData =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const previousPost = previousPostData
    ? {
        href: `/posts/${previousPostData.slug}`,
        title: previousPostData.title,
      }
    : undefined;

  const nextPost = nextPostData
    ? {
        href: `/posts/${nextPostData.slug}`,
        title: nextPostData.title,
      }
    : undefined;

  const relatedPosts = getRelatedPosts(post.slug, post.location, 3);

  return (
    <Client
      post={post}
      previousPost={previousPost}
      nextPost={nextPost}
      relatedPosts={relatedPosts}
    >
      <ArticleContent content={post.content} currentPostType={post.type} />
    </Client>
  );
};

export default PostPage;
