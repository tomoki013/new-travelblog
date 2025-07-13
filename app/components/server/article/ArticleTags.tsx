import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ArticleTagsProps {
    tags: string[];
}

const ArticleTags = ({ tags }: ArticleTagsProps) => (
    <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
            <Link
                key={tag}
                href={`/search?keyword=${encodeURIComponent(tag)}`}
            >
                <Badge variant="outline">
                    #{tag}
                </Badge>
            </Link>
        ))}
    </div>
);

export default ArticleTags;
