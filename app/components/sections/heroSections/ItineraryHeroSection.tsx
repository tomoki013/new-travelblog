"use client";

import { Calendar, FileText, MapPin } from "lucide-react";
import * as Elements from "@/app/components/elements/index";
import { useEffect, useState } from "react";
import { Post } from "@/lib/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const ItineraryHeroSection = () => {
    const [itineraryPosts, setItineraryPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true); // ローディング開始
            const itineraryResponse = await fetch('/api/posts?type=itinerary');
            const itineraryData = await itineraryResponse.json();
            setItineraryPosts(itineraryData.posts);
            setIsLoading(false); // ローディング終了
        };

        fetchPosts();
    }, []);

    return (
        <div className="container relative z-10">
            <div className="mb-10 flex items-center justify-between">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    <div>
                        <Badge className="mb-4">New</Badge>
                        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                            実際の旅程と費用を公開<br />
                            旅行計画の参考に
                        </h2>
                        <p className="mb-6 text-lg text-muted-foreground">
                            実際の旅行者による詳細な旅程と費用のレポート。
                            宿泊費、交通費、食費など、カテゴリー別の支出から、
                            おすすめの過ごし方まで、旅行計画の参考になる情報をお届けします。
                        </p>
                        <Button asChild size="lg">
                            <Link href="/itinerary" className="inline-flex items-center">
                                <FileText className="mr-2 h-5 w-5" />
                                旅程＆費用レポートを見る
                            </Link>
                        </Button>
                    </div>
                    {isLoading ? (
                        <Elements.LoadingAnimation />
                    ) : (
                    <div className="space-y-4">
                        {itineraryPosts.slice(0, 2).map((post) => (
                            <Card key={post.slug} className="overflow-hidden transition-all hover:shadow-lg">
                                <Link href={`/itinerary/${post.slug}`}>
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
                                                {post.excerpt}
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
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ItineraryHeroSection;
