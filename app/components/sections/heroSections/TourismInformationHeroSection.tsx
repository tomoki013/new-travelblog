"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as Elements from "@/app/components/elements/index";
import { useEffect, useState } from "react";
import { Post } from "@/types/types"; // Post型をインポート

const TourismInformationHeroSection = () => {
    const [tourismPosts, setTourismPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理

    useEffect(() => {
            const fetchPosts = async () => {
                setIsLoading(true); // ローディング開始
                const tourismResponse = await fetch('/api/posts?type=tourism');
                const tourismData = await tourismResponse.json();
                setTourismPosts(tourismData.posts);
                setIsLoading(false); // ローディング終了
            };
    
            fetchPosts();
        }, []);

    return (
        <div className="container relative z-10">
            <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-bold">観光情報</h2>
                <Link
                    href='/tourism'
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                >
                    すべての記事を見る
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>
            {isLoading ? ( // ローディング中はスピナーを表示
                <Elements.LoadingAnimation />
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {tourismPosts.slice(0, 8).map((info) => (
                        <Elements.PostCard
                            key={info.slug}
                            post={info}
                            linkPrefix="tourism"
                            postCardType={2}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TourismInformationHeroSection;
