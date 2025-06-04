import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ArticleNavigationProps {
    prevPost?: { slug: string; title: string } | null;
    nextPost?: { slug: string; title: string } | null;
    type?: string;
}

const ArticleNavigation = ({ prevPost, nextPost, type = "diary" }: ArticleNavigationProps) => (
    <div className="flex justify-between">
        {prevPost && (
            <Link href={`/${type}/${prevPost.slug}`} className="flex items-center text-sm font-medium hover:underline">
                <ArrowLeft className="ml-1 h-4 w-4" />
                {prevPost.title}
            </Link>
        )}
        {nextPost && (
            <Link href={`/${type}/${nextPost.slug}`} className="flex items-center text-sm font-medium hover:underline">
                {nextPost.title}
                <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
        )}
    </div>
);

export default ArticleNavigation;
