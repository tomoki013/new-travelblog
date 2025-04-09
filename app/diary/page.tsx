// 'use client';

// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useState } from "react";
import * as Sections from '@/app/components/sections/index';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ともきちの旅行日記 | 国内外の旅の記録と体験",
    description: "ともきちの旅行日記では、日本各地や海外の旅行体験を、実際のレポートや魅力的な写真とともにご紹介。美しい風景、文化体験、グルメ情報など、旅のエッセンスを余すことなくお届けします。",
};

const DiaryPage = () => {
    // const [searchQuery, setSearchQuery] = useState('');
    // const [categoryFilter, setCategoryFilter] = useState('all');

    // const filteredPosts = posts.filter((post) => {
    //     const matchesSearch =
    //         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         post.location.toLowerCase().includes(searchQuery.toLowerCase());

    //     const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;

    //     return matchesSearch && matchesCategory;
    // });

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">旅行日記</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">日本国内や世界各地を旅した記録と体験をお届けします。美しい風景、文化体験、グルメ情報など、旅の魅力を発見してください。</p>
            </div>

            {/* Search and Filter */}
            {/* <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="タイトル、内容、場所で検索..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="カテゴリー" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">全て</SelectItem>
                        <SelectItem value="国内旅行">国内旅行</SelectItem>
                        <SelectItem value="海外旅行">海外旅行</SelectItem>
                    </SelectContent>
                </Select>
            </div> */}

            {/* Diary Posts */}
            <Sections.Posts type="diary" />

        </div>
    );
}

export default DiaryPage;
