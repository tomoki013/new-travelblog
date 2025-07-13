'use client'

import { Badge } from "@/components/ui/badge";
import { popularKeywords } from "@/data/popularKeywords";
import { Post } from "@/types/types";
import Link from "next/link";

interface TagListProps {
    post: Post;
}

const TagList = ({
    post,
}: TagListProps
) => {
    
    return (
        <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 text-lg font-medium">人気のタグ</h3>
            <div className="flex flex-wrap gap-2">
                {popularKeywords.map((tag) => (
                    <Link
                        key={tag}
                        href={`/search?keyword=${encodeURIComponent(tag)}&category=${post.type}`}
                    >
                        <Badge variant="outline">
                            #{tag}
                        </Badge>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TagList;
