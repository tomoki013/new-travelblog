// /app/search/page.tsx
"use client";

import * as Sections from '@/app/components/sections/index';
import { useSearchParams } from 'next/navigation'; // To read URL query parameters
import { Suspense } from 'react'; // For better UX with useSearchParams

// A wrapper component to handle useSearchParams, as it needs to be in a Client Component
const SearchResultsContent = () => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    const category = searchParams.get('category') as 'all' | 'diary' | 'tourism' | 'itinerary' || 'all';

    // Determine the correct category for the Posts component
    // The `Posts` component expects `type` to be one of 'all', 'diary', 'tourism', 'itinerary'.
    // If the category from URL is one of these, use it directly. Otherwise, default to 'all'.
    const postType = ['all', 'diary', 'tourism', 'itinerary'].includes(category)
        ? category as 'all' | 'diary' | 'tourism' | 'itinerary'
        : 'all';

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                {/* <Sections.SearchHeroSection /> */}
                <h1 className="mb-4 text-4xl font-bold">
                    検索結果: {keyword && `「${keyword}」`} {category !== 'all' && `(カテゴリー: ${getCategoryDisplayName(category)})`}
                </h1>
                {(!keyword && category === 'all') && (
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        検索キーワードまたはカテゴリーを入力してください。
                    </p>
                )}
            </div>
            <Sections.Posts
                type={postType} // Use the determined postType
                initialSearchQuery={keyword} // Pass the keyword
                initialCategoryFilter={category} // Pass the specific category filter
                inputClassName='hidden'
                tabListClassName='hidden'
                // You might need to adjust the Posts component to accept these initial filters
                // or modify how filtering is applied based on URL params.
            />
        </div>
    );
};

// Helper function to get a display name for the category
const getCategoryDisplayName = (categoryValue: string) => {
    switch (categoryValue) {
        case 'diary': return '旅行日記';
        case 'tourism': return '観光情報';
        case 'itinerary': return '旅程＆費用レポート';
        default: return 'すべて';
    }
};

const SearchPage = () => {
    return (
        // Suspense is recommended when using useSearchParams
        <Suspense fallback={<div className="container py-12 text-center">読み込み中...</div>}>
            <SearchResultsContent />
        </Suspense>
    );
};

export default SearchPage;