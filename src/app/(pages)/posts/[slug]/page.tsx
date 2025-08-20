import { getPostBySlug } from "@/lib/markdown";
import Client from "./Client";
import ArticleContent from "@/components/featured/article/Article";
import path from "path";
import { promises as fs } from "fs";
import type { PostType } from "@/types/types";
import { Metadata } from "next";

const categories: PostType[] = ["diary", "tourism", "itinerary", "series"];

const findCategoryBySlug = async (slug: string): Promise<PostType | null> => {
  for (const category of categories) {
    const filePath = path.join(
      process.cwd(),
      "src",
      "posts",
      category,
      `${slug}.md`
    );
    try {
      await fs.access(filePath);
      return category;
    } catch {
      // ファイルがなければ次へ
    }
  }
  return null;
};

// 動的にメタデータを生成
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = await params.slug;
  const category = await findCategoryBySlug(slug);

  if (!category) {
    return {
      title: "記事が見つかりませんでした",
      description: "指定された記事は存在しません。",
    };
  }
  const post = getPostBySlug(category as PostType, slug);

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

const PostPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const slug = await params.slug;
  const category = await findCategoryBySlug(slug);

  if (!category) {
    // 404などのエラーハンドリング
    return <div>記事が見つかりませんでした。</div>;
  }

  const post = getPostBySlug(category as PostType, slug);
  return (
    <Client post={post}>
      <ArticleContent content={post.content} currentPostType={post.type} />
    </Client>
  );
};

export default PostPage;
