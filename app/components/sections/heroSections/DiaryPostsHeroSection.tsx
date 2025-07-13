import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as Sections from "@/app/components/sections/index";
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
            <Sections.Posts
                initialPosts={diaryPosts}
                postFilterType="diary"
                showSearchInput={false}
                showCategoryTabs={false}
                displayCount={3}
                postsGridColsClass="sm:grid-cols-2 lg:grid-cols-3"
            />
        </div>
    )
}

export default DiaryPostsHeroSection;
