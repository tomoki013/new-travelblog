import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Wallet } from "lucide-react";
import { Post } from "@/types/types";
import { getDatePrefix } from "@/lib/dateFormat";

const ItineraryListCard = ({ post, linkPrefix }: { post: Post; linkPrefix: string }) => {
    const days = (new Date(post.dates[post.dates.length - 1]).getTime() - new Date(post.dates[0]).getTime()) / (1000 * 3600 * 24) + 1;

    return (
        <Link href={`/${linkPrefix}/${post.slug}`} className="block group">
            <Card className="h-full overflow-hidden transition-all hover:shadow-xl flex flex-col">
                <div className="relative h-48 w-full">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 group-hover:scale-102"
                    />
                </div>
                <CardHeader>
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge className="mb-3">{Array.isArray(post.category) ? post.category.join(", ") : post.category}</Badge>
                        <span className="flex items-center text-xs text-muted-foreground">
                            <p>
                                {getDatePrefix(post.type)}
                            </p>
                            <Calendar className="mr-1 h-3 w-3" />
                            {post.dates.join("～")}
                        </span>
                    </div>
                    <CardTitle className="line-clamp-2 leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                    </p>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4 pt-4 border-t">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Wallet className="h-4 w-4 mr-2" />
                        <span className="font-semibold">総費用:</span>
                        <span className="ml-2 text-lg font-bold text-primary">{post.budget?.toLocaleString()}円</span>
                    </div>
                    <div className="flex justify-between w-full text-xs text-muted-foreground">
                        <span className="flex items-center"><Calendar className="h-3 w-3 mr-1.5" />{days}日間</span>
                        <span className="flex items-center"><MapPin className="h-3 w-3 mr-1.5" />{Array.isArray(post.location) ? post.location.join(', ') : post.location}</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default ItineraryListCard;
