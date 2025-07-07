import ArticleNavigation from './ArticleNavigation';
import ArticleMeta from './ArticleMeta';
import ArticleImage from './ArticleImage';
import ArticleMobileToc from './ArticleMobileToc';
import ArticleContent from './ArticleContent';
import ArticleTags from './ArticleTags';
import ArticleAuthor from './ArticleAuthor';
import { Separator } from "@radix-ui/react-select";
import { Post } from "@/types/types";

interface Author {
    name: string;
    role: string;
    description: string;
    image: string;
}

interface ArticleProps {
    post: Post;
    author: Author;
    prevPost?: { slug: string; title: string; dates: string[]; image: string; type: "diary" | "tourism" | "itinerary" } | null;
    nextPost?: { slug: string; title: string; dates: string[]; image: string; type: "diary" | "tourism" | "itinerary" } | null;
    navHidden?: string;
    isItinerary?: boolean;
    allPosts: Post[];
}

const Article = ({
    post,
    author,
    prevPost = null,
    nextPost = null,
    navHidden,
    allPosts,
}: ArticleProps
) => {
    return (
        <article>
            <ArticleNavigation prevPost={prevPost} nextPost={nextPost} />
            <ArticleMeta post={post} />
            <ArticleImage src={post.image} alt={post.title} />
            <ArticleMobileToc navHidden={navHidden} />
            <ArticleContent content={post.content} allPosts={allPosts} currentPostType={post.type} />
            <ArticleTags tags={post.tags} />
            <ArticleNavigation prevPost={prevPost} nextPost={nextPost} />
            <Separator className="my-8" />
            <ArticleAuthor author={author} />
        </article>
    );
};

export default Article;
