import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as Elements from "@/app/components/elements/index";
import getAllPosts from "@/lib/markdown";

const TourismInformationHeroSection = () => {
    const tourismPosts = getAllPosts('tourism');

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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {tourismPosts.slice(0, 8).map((info) => (
                    <Elements.PostCard
                        key={info.slug}
                        post={info}
                        linkPrefix="tourism"
                        postCardType={2}
                    />
                ))}
            </div>
        </div>
    )
}

export default TourismInformationHeroSection;
