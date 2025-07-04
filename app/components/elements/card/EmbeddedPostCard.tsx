import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Post } from "@/types/types";

const EmbeddedPostCard = ({ post }: { post: Post }) => (
    <Link href={`/${post.type}/${post.slug}`} className="block group my-6 no-underline hover:no-underline">
        <Card className="overflow-hidden transition-all hover:shadow-lg flex flex-col sm:flex-row w-full">
            <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-102"
                />
            </div>
            <CardContent className="p-4 flex flex-col justify-center">
                <Badge className="mb-2 w-fit">{Array.isArray(post.category) ? post.category[0] : post.category}</Badge>
                <h4 className="mb-2 text-lg font-bold leading-tight text-card-foreground">{post.title}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.dates[0]}
                    </span>
                    <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {Array.isArray(post.location) ? post.location[0] : post.location}
                    </span>
                </div>
            </CardContent>
        </Card>
    </Link>
);

export default EmbeddedPostCard;
