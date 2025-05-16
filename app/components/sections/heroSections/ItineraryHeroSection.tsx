"use client";

import { FileText } from "lucide-react";
import * as Elements from "@/app/components/elements/index";
import { useEffect, useState } from "react";
import { Post } from "@/lib/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
                            <Elements.PostCard
                                key={post.slug}
                                post={post}
                                linkPrefix="itinerary"
                                postCardType={3}
                            />
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ItineraryHeroSection;
