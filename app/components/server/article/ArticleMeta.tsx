import { Calendar, MapPin } from "lucide-react";
import { Post } from "@/types/types";
import ArticleTags from "./ArticleTags";

const ArticleMeta = ({ post }: { post: Post }) => {
    return (
        <div className="my-6">
            <ArticleTags tags={post.tags} />
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                    <p>
                        {post.type === "diary" || post.type === "itinerary"
                            ? "旅行日："
                            : post.type === "tourism"
                            ? "更新日："
                            : ""}
                    </p>
                    <Calendar className="mr-1 h-4 w-4" />
                    {post.dates.join("～")}
                </div>
                {post.location && (
                    <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {post.location}
                    </div>
                )}
            </div>
        </div>
    )
};

export default ArticleMeta;
