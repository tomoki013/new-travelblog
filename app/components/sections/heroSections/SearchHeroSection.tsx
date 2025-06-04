"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // Import useRouter
import * as Elements from '@/app/components/elements/index';

const SearchHeroSection = () => {
    const router = useRouter();

    return (
        <div className="container relative z-10">
            <div className="mb-10">
                <div className="rounded-xl bg-background/80 backdrop-blur-lg shadow-lg p-8 border">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold mb-2">記事を探す</h2>
                        <p className="text-muted-foreground">
                            旅行日記、観光情報、費用レポートなど、すべての記事から検索できます
                        </p>
                    </div>
                    <Elements.SearchBox className="mb-2" mode="url" />
                    <div className="mt-4 flex flex-wrap gap-2">
                        <p className="text-sm text-muted-foreground">人気のキーワード：</p>
                        {["京都", "温泉", "グルメ", "格安旅行", "週末旅行", "海外"].map((tag) => (
                            <Button
                                key={tag}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    router.push(`/search?keyword=${encodeURIComponent(tag)}&category=all`);
                                }}
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                  </div>
            </div>
        </div>
    )
}

export default SearchHeroSection;