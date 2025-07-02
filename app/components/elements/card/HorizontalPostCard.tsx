import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Post } from "@/types/types";
import { getDatePrefix } from "@/lib/dateFormat";

const HorizontalPostCard = ({ post, linkPrefix }: { post: Post; linkPrefix: string }) => (
    <Card key={post.slug} className="overflow-hidden transition-all hover:shadow-lg">
        <Link href={`/${linkPrefix}/${post.slug}`}>
            <div className="grid gap-4 p-6 sm:grid-cols-3">
                <div className="relative aspect-[4/3] sm:col-span-1">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="sm:col-span-2">
                    <div className="mb-2 flex items-center gap-2">
                        <Badge className="mb-3">{Array.isArray(post.category) ? post.category.join(", ") : post.category}</Badge>
                        <Badge variant="secondary">予算 {post.budget?.toLocaleString()}円</Badge>
                    </div>
                    <h3 className="mb-2 line-clamp-2 text-lg font-bold">{post.title}</h3>
                    <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                        {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + '...' : post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <p>
                                {getDatePrefix(post.type)}
                            </p>
                            <Calendar className="h-4 w-4" />
                            {post.dates.join("～")}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {post.location}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    </Card>
);

export default HorizontalPostCard;
