// app/components/elements/card/EmbeddedPostCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Post } from "@/types/types";

const EmbeddedPostCard = ({ post }: { post: Post }) => (
    <div className="my-6">
        <Link href={`/${post.type}/${post.slug}`} className="block group">
            <Card className="py-0 overflow-hidden transition-all hover:shadow-lg flex flex-col sm:flex-row">
                <div className="relative h-36 sm:h-auto sm:w-36 flex-shrink-0">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 group-hover:scale-102"
                    />
                </div>
                <CardContent className="p-2 flex flex-col justify-start">
                    <Badge className="mb-1 w-fit text-xs px-2 py-0.5">{Array.isArray(post.category) ? post.category[0] : post.category}</Badge>
                    <h4 className="mb-1 text-base font-semibold leading-tight">{post.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {post.dates[0]}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {Array.isArray(post.location) ? post.location[0] : post.location}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    </div>
);

export default EmbeddedPostCard;
