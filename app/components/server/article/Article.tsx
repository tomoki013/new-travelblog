import ArticleNavigation from './ArticleNavigation';
import ArticleMeta from './ArticleMeta';
import ArticleImage from './ArticleImage';
import ArticleMobileToc from './ArticleMobileToc';
import ArticleContent from './ArticleContent';
import ArticleTags from './ArticleTags';
import ArticleAuthor from './ArticleAuthor';
import { Separator } from "@radix-ui/react-select";
import { Post } from "@/types/types";
import { members } from '@/data/member';

const Article = ({
    post,
}: { post: Post }
) => {
    const author = members.find((member) => member.name === post.author) || { name: "ともきちの旅行日記", role: "", image: "/favicon.ico", description: "" };

    return (
        <article>
            {post.type === "diary" && (
                <ArticleNavigation post={post} />
            )}
            <ArticleMeta post={post} />
            <ArticleImage src={post.image} alt={post.title} />
            {post.type !=="diary" && (
                <ArticleMobileToc />
            )}
            <ArticleContent content={post.content} currentPostType={post.type} />
            <ArticleTags tags={post.tags} />
            {post.type === "diary" && (
                <ArticleNavigation post={post} />
            )}
            <Separator className="my-8" />
            <ArticleAuthor author={author} />
        </article>
    );
};

export default Article;
