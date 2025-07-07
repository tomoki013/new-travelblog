import * as Elements from "@/app/components/elements/index";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ArticleNavigationProps {
    prevPost?: { slug: string; title: string; dates: string[]; image: string; type: "diary" | "tourism" | "itinerary" } | null;
    nextPost?: { slug: string; title: string; dates: string[]; image: string; type: "diary" | "tourism" | "itinerary" } | null;
}

const ArticleNavigation = ({ prevPost, nextPost }: ArticleNavigationProps) => (
    <div className="flex justify-between gap-4">
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
);

export default ArticleNavigation;
