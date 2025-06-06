import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Post } from "@/lib/types";
import { getDatePrefix } from "@/lib/dateFormat";

const StandardPostCard = ({ post, linkPrefix }: { post: Post; linkPrefix: string }) => (
    <Link href={`${linkPrefix}/${post.slug}`} className="block group">
        <Card className='overflow-hidden transition-all hover:shadow-lg'>
            <div className="relative h-48 w-full">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-102"
                />
            </div>
            <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                    <Badge variant='outline'>{post.category}</Badge>
                    <span className="flex items-center text-xs text-muted-foreground">
                        <p>
                            {getDatePrefix(post.type)}
                        </p>
                        <Calendar className="mr-1 h-3 w-3" />
                        {post.dates.join("～")}
                    </span>
                </div>
                <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                    {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + '...' : post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                    <span className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {post.location}
                    </span>
                </div>
            </CardContent>
        </Card>
    </Link>
);

export default StandardPostCard;
