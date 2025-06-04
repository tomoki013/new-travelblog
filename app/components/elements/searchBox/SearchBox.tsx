// app/components/elements/searchBox/SearchBox.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchBoxProps {
    initialKeyword?: string;
    initialCategory?: string;
    onSearch?: (keyword: string, category: string) => void;
    className?: string;
}

const SearchBox = ({
    initialKeyword = '',
    initialCategory = 'all',
    onSearch,
    className = '',
}: SearchBoxProps) => {
    const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const router = useRouter();

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchKeyword, selectedCategory);
        } else {
            router.push(`/search?keyword=${encodeURIComponent(searchKeyword)}&category=${selectedCategory}`);
        }
    };

    return (
        <div className={`grid gap-4 md:grid-cols-12 ${className}`}>
            <div className="relative md:col-span-6">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="キーワードを入力..."
                    className="pl-10"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </div>
            <div className="md:col-span-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="カテゴリー" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="diary">旅行日記</SelectItem>
                        <SelectItem value="tourism">観光情報</SelectItem>
                        <SelectItem value="itinerary">旅程＆費用レポート</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="md:col-span-3">
                <Button className="w-full" onClick={handleSearch}>検索</Button>
            </div>
        </div>
    );
};

export default SearchBox;
