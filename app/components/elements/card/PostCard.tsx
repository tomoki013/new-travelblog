import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Post } from "@/lib/types";

const PostCard = ({ post, linkPrefix, postCardType }: { post: Post; linkPrefix: string; postCardType?: number }) => {
    const type = postCardType || 1;

    return (
        <div>
            {type === 2 ? (
                <Link href={`/${linkPrefix}/${post.slug}`}>
                    <div className="group relative h-64 overflow-hidden rounded-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                            <Badge className="mb-2">{post.category}</Badge>
                            <h3 className="text-lg font-bold">{post.title}</h3>
                        </div>
                    </div>
                </Link>
            ) : type === 3 ? (
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
                                    <Badge variant="outline">{post.category}</Badge>
                                    <Badge variant="secondary">予算 {post.budget?.toLocaleString()}円</Badge>
                                </div>
                                <h3 className="mb-2 line-clamp-2 text-lg font-bold">{post.title}</h3>
                                <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                                    {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + '...' : post.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
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
            ) : (
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
                        <p className="mb-4 text-sm text-muted-foreground">
                            {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + '...' : post.excerpt}
                        </p>
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
            )}
        </div>
    );
}

export default PostCard;
