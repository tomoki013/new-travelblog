// app/components/elements/searchBox/SearchBox.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePostFilters } from '@/lib/hooks/usePostFilters';

interface SearchBoxProps {
    initialKeyword?: string;
    initialCategory?: string;
    onSearch: (keyword: string, category: string) => void;
    className?: string;
    mode?: 'url' | 'realtime'; // 追加: 検索挙動の切り替え
    categories?: { id: string; name: string }[]; // カテゴリリストを外部からも受け取れるように
}

const DEFAULT_CATEGORIES = [
    { id: 'all', name: 'すべて' },
    { id: 'diary', name: '旅行日記' },
    { id: 'tourism', name: '観光情報' },
    { id: 'itinerary', name: '旅程＆費用レポート' },
];

const SearchBox = ({
    initialKeyword = '',
    initialCategory = 'all',
    onSearch,
    className = '',
    mode = 'url',
    categories = DEFAULT_CATEGORIES,
}: SearchBoxProps) => {
    // usePostFiltersを利用
    const {
        keyword: filterKeyword,
        activeTab: filterCategory,
        handleKeywordChange: handleFilterKeywordChange,
        handleTabChange: handleFilterCategoryChange,
    } = usePostFilters({
        basePosts: [], // 検索対象のpostsが必要な場合はpropsで受け取る設計に拡張可
        initialKeyword,
        initialCategory,
        syncWithUrl: mode === 'url',
        pageTypeForTabs: 'all',
    });

    const [searchKeyword, setSearchKeyword] = useState(filterKeyword);
    const [selectedCategory, setSelectedCategory] = useState(filterCategory);
    const router = useRouter();

    // usePostFiltersの値が変わったらローカルstateも同期
    useEffect(() => {
        setSearchKeyword(filterKeyword);
    }, [filterKeyword]);
    useEffect(() => {
        setSelectedCategory(filterCategory);
    }, [filterCategory]);

    // URLパラメータで検索
    const handleSearch = () => {
        if (mode === 'realtime' && onSearch) {
            onSearch(searchKeyword, selectedCategory);
        } else {
            const url = `/search?keyword=${encodeURIComponent(searchKeyword)}&category=${selectedCategory}`;
            if (typeof window !== 'undefined' && window.location.pathname === '/search') {
                router.replace(url);
            } else {
                router.push(url);
            }
        }
    };

    // キーワード変更
    const handleKeywordChange = (value: string) => {
        setSearchKeyword(value);
        handleFilterKeywordChange(value);
        if (mode === 'realtime' && onSearch) {
            onSearch(value, selectedCategory);
        }
    };
    // カテゴリ変更
    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        handleFilterCategoryChange(value);
        if (mode === 'realtime' && onSearch) {
            onSearch(searchKeyword, value);
        }
        // mode==='url'では即検索しない
    };

    return (
        <div className={`relative flex flex-col sm:flex-row gap-4 mb-4 ${className}`}>
            <div className="relative w-full sm:w-auto flex-1">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="キーワードを入力..."
                    className="w-full pl-10 p-2 border rounded"
                    value={searchKeyword}
                    onChange={(e) => handleKeywordChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </div>
            {mode === 'url' && (
                <div className="w-full sm:w-[180px]">
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="カテゴリー" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(cat => (
                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            {mode === 'url' && (
                <div className="w-full sm:w-[120px]">
                    <Button className="w-full" onClick={handleSearch}>検索</Button>
                </div>
            )}
        </div>
    );
};

export default SearchBox;
