import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Post } from "@/lib/types";

const PostCard = ({ post, linkPrefix }: { post: Post; linkPrefix: string }) => {
    return (
        <Card className='overflow-hidden transition-all hover:shadow-lg'>
            <div className="relative h-48 w-full">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                    <Badge variant='outline'>{post.category}</Badge>
                    <span className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {post.dates.join("～")}
                    </span>
                </div>
                <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                    <span className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {post.location}
                    </span>
                    <Link
                        href={`/${linkPrefix}/${post.slug}`}
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        続きを読む
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default PostCard;
