"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import * as Elements from '@/app/components/elements/index';
import * as Sections from '@/app/components/sections/index';
import { Post } from '@/types/types';

interface SearchPageContentProps {
    allPosts: Post[];
}

const getCategoryDisplayName = (categoryValue: string) => {
    return categoryValue === 'all' ? 'すべてのカテゴリー' : 
           categoryValue === 'diary' ? '旅行日記' : 
           categoryValue === 'tourism' ? '観光情報' : 
           categoryValue === 'itinerary' ? '旅程＆費用レポート' : 'その他';
};

const SearchPageContent = ({
    allPosts,
}: SearchPageContentProps
) => {
    return (
        <Suspense>
            <SearchPageContentInner allPosts={allPosts} />
        </Suspense>
    );
};

const SearchPageContentInner = ({ allPosts }: SearchPageContentProps) => {
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
            
            <Elements.SearchHeroSection />
            
            <Sections.Posts
                initialPosts={allPosts}
                postFilterType="all"
                syncWithUrl={true}
                showSearchInput={false}
                showCategoryTabs={false}
            />
        </div>
    );
};

export default SearchPageContent;
