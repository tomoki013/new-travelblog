import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Client from "./Client";
import ArticleContent from "@/components/featured/article/Article";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Post } from "@/types/types";

type PostMetadata = Omit<Post, "content">;

// 1. 静的パスを生成
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. 動的にメタデータを生成
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  try {
    const post = await getPostBySlug(params.slug);

    return {
      title: post.title,
      description: post.excerpt,
      authors: post.author ? [{ name: post.author }] : [],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        images: post.image ? [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ] : [],
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
const PostPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const slug = params.slug;

  let post: Post;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    return notFound();
  }

  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);

  const previousPostData = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPostData = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

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

  // Re-implement related posts logic: find posts with a shared tag.
  let relatedPosts: PostMetadata[] = [];
  if (post.tags && post.tags.length > 0) {
    const primaryTag = post.tags[0];
    const postsWithTag = await getAllPosts({ tag: primaryTag });
    relatedPosts = postsWithTag.filter(p => p.slug !== post.slug).slice(0, 3);
  }

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
