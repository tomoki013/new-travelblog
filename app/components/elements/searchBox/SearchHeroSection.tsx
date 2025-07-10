"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // Import useRouter
import * as Elements from '@/app/components/elements/index';
import { popularKeywords } from "@/data/popularKeywords";
import { useState } from "react"; // Import useState

const SearchHeroSection = () => {
    const router = useRouter();
    // 検索キーワード状態とカテゴリー状態をここで管理
    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <div className="container relative z-10 my-2">
            <div className="mb-10">
                <div className="rounded-xl bg-background/80 backdrop-blur-lg shadow-lg p-8 border">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold mb-2">記事を探す</h2>
                        <p className="text-muted-foreground">
                            旅行日記、観光情報、費用レポートなど、すべての記事から検索できます
                        </p>
                    </div>
                    <Elements.SearchBox
                        className="mb-2"
                        mode="url"
                        initialKeyword={keyword}
                        initialCategory={selectedCategory}
                        onSearch={(k, c) => {
                            setKeyword(k);
                            setSelectedCategory(c);
                        }}
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                        <p className="text-sm text-muted-foreground">人気のキーワード：</p>
                        {popularKeywords.map((tag) => (
                            <Button
                                key={tag}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setKeyword(tag);
                                    router.push(`/search?keyword=${encodeURIComponent(tag)}&category=${selectedCategory}`);
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