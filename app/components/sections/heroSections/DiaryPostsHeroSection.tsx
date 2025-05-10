"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as Elements from "@/app/components/elements/index";
import { useEffect, useState } from "react";
import { Post } from "@/lib/types";

const DiaryPostsHeroSection = () => {
    const [diaryPosts, setDiaryPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true); // ローディング開始
            const diaryResponse = await fetch('/api/posts?type=diary');
            const diaryData = await diaryResponse.json();
            setDiaryPosts(diaryData.posts);
            setIsLoading(false); // ローディング終了
        };

        fetchPosts();
    }, []);

    return (
        <div className="container relative z-10">
            <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-bold">最新の旅行日記</h2>
                <Link
                    href='/diary'
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                >
                    すべての記事を見る
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>
            {isLoading ? ( // ローディング中はスピナーを表示
                <Elements.LoadingAnimation />
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {diaryPosts.slice(0, 3).map((post) => (
                        <Elements.PostCard
                            key={post.slug}
                            post={post}
                            linkPrefix="diary"
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default DiaryPostsHeroSection;
