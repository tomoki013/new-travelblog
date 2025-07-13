import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as Sections from "@/app/components/sections/index";
import { Post } from "@/types/types";

interface TourismInformationHeroSectionProps {
    posts: Post[];
}

const TourismInformationHeroSection = ({
    posts
}: TourismInformationHeroSectionProps
) => {
    const tourismPosts = posts;
    
    return (
        <div className="container relative z-10">
            <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-bold">観光情報</h2>
                <Link
                    href='/tourism'
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                >
                    すべての記事を見る
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>
            <Sections.Posts
                initialPosts={tourismPosts}
                postFilterType="tourism"
                showSearchInput={false}
                showCategoryTabs={false}
                postCardType={2}
                displayCount={8}
                postsGridColsClass="sm:grid-cols-2 lg:grid-cols-4"
            />
        </div>
    )
}

export default TourismInformationHeroSection;
