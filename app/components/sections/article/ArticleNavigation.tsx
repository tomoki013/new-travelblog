import * as Elements from "@/app/components/elements/index";
import getAllPosts from "@/lib/markdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Post } from "@/types/types";

const ArticleNavigation = ({ post }: { post: Post }) => {
    const allPosts = getAllPosts(post.type);
    const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
    const prevPost = allPosts[currentIndex - 1] || null;
    const nextPost = allPosts[currentIndex + 1] || null;

    return (
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
            {prevPost && (
                <div className="flex items-center gap-4 rounded-lg border bg-card p-2">
                    <ArrowLeft className="h-6 w-6 text-muted-foreground" />
                    <Elements.MinimumPostCard
                        post={prevPost}
                    />
                </div>
            )}
            {nextPost && (
                <div className="flex items-center gap-4 rounded-lg border bg-card p-2">
                    <Elements.MinimumPostCard
                        post={nextPost}
                    />
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
            )}
        </div>
    )
};

export default ArticleNavigation;
