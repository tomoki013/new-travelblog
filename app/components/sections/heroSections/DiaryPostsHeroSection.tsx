import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as Elements from "@/app/components/elements/index";
import { Post } from "@/types/types";

interface DiaryPostsHeroSectionProps {
    posts: Post[];
}

const DiaryPostsHeroSection = ({
    posts
}: DiaryPostsHeroSectionProps
) => {
    const diaryPosts = posts;

    return (
        <div className="container relative z-10">
            <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-bold">最新の旅行日記</h2>
                <Link
                    href='/diary'
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                >
                    すべての記事を見る
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {diaryPosts.slice(0, 3).map((post) => (
                    <Elements.PostCard
                        key={post.slug}
                        post={post}
                        linkPrefix="diary"
                    />
                ))}
            </div>
        </div>
    )
}

export default DiaryPostsHeroSection;
