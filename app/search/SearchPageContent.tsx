"use client";

import { useSearchParams } from 'next/navigation';
import * as Sections from '@/app/components/sections/index';

const getCategoryDisplayName = (categoryValue: string) => {
    return categoryValue === 'all' ? 'すべてのカテゴリー' : categoryValue === 'diary' ? '旅行日記' : categoryValue === 'tourism' ? '観光情報' : categoryValue === 'itinerary' ? '旅程＆費用レポート' : 'その他';
};

const SearchPageContent = () => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword') || undefined;
    const category = searchParams.get('category') || undefined;

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">
                    検索結果{keyword && `:「${keyword}」`} {category && category !== 'all' && ` (カテゴリ: ${getCategoryDisplayName(category)})`}
                </h1>
                {(!keyword && (!category || category === 'all')) && (
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        検索キーワードまたはカテゴリーを入力してください。
                    </p>
                )}
            </div>
            <Sections.SearchHeroSection />
            <Sections.Posts
                apiFetchType="all"
                syncWithUrl={true}
                showSearchInput={false}
                showCategoryTabs={false}
            />
        </div>
    );
};

export default SearchPageContent;
