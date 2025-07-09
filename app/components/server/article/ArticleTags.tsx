import { Badge } from "@/components/ui/badge";

interface ArticleTagsProps {
    tags: string[];
}

const ArticleTags = ({ tags }: ArticleTagsProps) => (
    <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
            <Badge key={tag} variant="outline">
                #{tag}
            </Badge>
        ))}
    </div>
);

export default ArticleTags;
