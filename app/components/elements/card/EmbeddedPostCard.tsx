import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/types";

const EmbeddedPostCard = ({ post }: { post: Post }) => (
    <Link href={`/${post.type}/${post.slug}`} className="block group my-6 no-underline hover:no-underline" aria-label={`記事「${post.title}」へのリンク`}>
        <div className="flex items-center overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md">
            {/* Left: Image */}
            <div className="relative h-24 w-40 flex-shrink-0">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            {/* Right: Text Content */}
            <div className="flex flex-col justify-center p-4">
                <span className="mb-2 font-bold leading-tight text-card-foreground group-hover:underline">
                    {post.title}
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {post.dates[0]}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" />
                        {Array.isArray(post.location) ? post.location[0] : post.location}
                    </span>
                </div>
            </div>
        </div>
    </Link>
);

export default EmbeddedPostCard;
