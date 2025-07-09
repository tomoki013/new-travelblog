import { getDatePrefix } from "@/lib/dateFormat";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MinimumPostCardProps {
    post: { slug: string; title: string; dates: string[]; image: string; type: "diary" | "tourism" | "itinerary" };
}

const MinimumPostCard = ({ post }: MinimumPostCardProps) => {
    return (
        <Link href={`/${post.type}/${post.slug}`}>
            <div className="flex gap-3">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <h4 className="text-sm font-medium">
                        {post.title}
                    </h4>
                    <span className="flex items-center gap-1 text-muted-foreground text-sm">
                        <p>
                            {getDatePrefix(post.type)}
                        </p>
                        <Calendar className="h-4 w-4" />
                        {post.dates.join("～")}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default MinimumPostCard;
