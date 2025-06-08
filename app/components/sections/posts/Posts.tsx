// app/components/sections/posts/PostsWrapper.tsx
"use client";

import { Suspense, useEffect, useState } from 'react';
import * as Elements from '@/app/components/elements/index';
import { Post } from '@/types/types';
import { usePostFilters } from '@/lib/hooks/usePostFilters';
import { PostFiltersUI } from './PostFiltersUI';
import { PostList } from './PostList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Tabs と TabsContent をインポート
import { useSearchParams } from 'next/navigation';

interface PostsProps {
    // APIからどのタイプの記事を初期取得するか
    apiFetchType: 'all' | 'diary' | 'tourism' | 'itinerary';
    // URL同期を行うか (検索ページではtrue, 他のリストページではfalse)
    syncWithUrl?: boolean;
    // ページの種類に応じて表示するタブのカテゴリリストを決定
    pageTypeForTabs?: 'all' | 'diary' | 'tourism' | 'itinerary';

    // UI要素の表示/非表示フラグ
    showSearchInput?: boolean;
    showCategoryTabs?: boolean;
    showBudgetFilter?: boolean;

    // UI要素のクラス名カスタマイズ用
    tabsGridColsClass?: string; // TabsListのグリッドカラム数

    // ページ固有の事前フィルタリング用 (例: /tourism/region/[city] の場合)
    specificFilterType?: 'region' | 'author';
    specificFilterValue?: string;

    // ポストカードのタイプを指定
    postCardType?: number;
}

const PostsContent = ({
    apiFetchType,
    syncWithUrl = false,
    pageTypeForTabs = apiFetchType, // デフォルトはapiFetchTypeと同じ
    showSearchInput = true,
    showCategoryTabs = true,
    showBudgetFilter = false,
    tabsGridColsClass,
    specificFilterType,
    specificFilterValue,
    postCardType = 1, // デフォルトのポストカードタイプ
}: PostsProps) => {
    const [basePosts, setBasePosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 外部から渡される可能性のある初期値をuseSearchParamsから取得しないようにする
    // usePostFilters内でsyncWithUrlがtrueの場合のみURLを読み込む
    const searchParams = useSearchParams(); // ここで取得
    const initialKeyword = syncWithUrl ? (searchParams.get('keyword') || '') : '';
    const initialCategory = syncWithUrl ? (searchParams.get('category') || 'all') : 'all';
    const initialBudget = syncWithUrl ? (searchParams.get('budget') || 'all') : 'all';


    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            // apiFetchTypeに基づいてAPIから記事を取得
            const endpoint = apiFetchType === 'all' ? '/api/posts' : `/api/posts?type=${apiFetchType}`;
            const res = await fetch(endpoint);
            const data = await res.json();

            let postsToFilter = data.posts as Post[];

            // ページ固有の事前フィルタリング (例: 地域ページや著者ページ)
            if (specificFilterType && specificFilterValue) {
                postsToFilter = postsToFilter.filter(post => {
                    console.log(post.location, specificFilterValue);
                    if (specificFilterType === 'region') {
                        return post.location.some(loc => loc.toLowerCase().includes(specificFilterValue.toLowerCase()));
                    }
                    if (specificFilterType === 'author') return post.author === specificFilterValue;
                    return true;
                });
            }
            setBasePosts(postsToFilter);
            setIsLoading(false);
        };
        fetchPosts();
    }, [apiFetchType, specificFilterType, specificFilterValue]);

    const {
        keyword,
        activeTab,
        budget,
        filteredPosts,
        categoriesForTabs,
        handleKeywordChange,
        handleTabChange,
        handleBudgetChange,
    } = usePostFilters({
        basePosts,
        initialKeyword,
        initialCategory,
        initialBudget,
        syncWithUrl,
        pageTypeForTabs,
    });

    if (isLoading && basePosts.length === 0) { // 初回ロード時のみローディング表示
        return <Elements.LoadingAnimation />;
    }

    return (
        <div>
            {/* フィルターUIはTabsコンポーネントの外に配置するか、TabsListだけをPostFiltersUIに任せる */}
            <PostFiltersUI
                keyword={keyword}
                onKeywordChange={handleKeywordChange}
                activeTab={activeTab}
                onTabChange={handleTabChange} // TabsコンポーネントのonValueChangeに渡す
                budget={budget}
                onBudgetChange={handleBudgetChange}
                categories={categoriesForTabs}
                showSearchInput={showSearchInput}
                showCategoryTabs={false} // TabsListは下のTabsコンポーネントで直接レンダリングするためfalse
                showBudgetFilter={showBudgetFilter}
            />

            {showCategoryTabs ? (
                <Tabs value={activeTab} onValueChange={handleTabChange} className={`mb-10`}>
                    <TabsList className={`mb-8 grid w-full h-auto grid-cols-2 ${tabsGridColsClass}`}>
                        {categoriesForTabs.map(cat => (
                            <TabsTrigger key={cat.id} value={cat.id}>
                                {cat.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {/* フィルタリングされた記事リストを表示 */}
                    {/* activeTabに関わらず、filteredPostsは常に最新なので、Contentは一つで良い */}
                    <TabsContent value={activeTab} forceMount>
                        {isLoading && basePosts.length > 0 ? <Elements.LoadingAnimation /> : <PostList posts={filteredPosts} postCardType={postCardType} />}
                    </TabsContent>
                     {/* すべてのタブのコンテンツをレンダリングし、CSSで表示/非表示を制御する場合 */}
                    {/* {categoriesForTabs.map(cat => (
                        <TabsContent key={cat.id} value={cat.id}>
                            <PostList posts={filteredPosts} />
                        </TabsContent>
                    ))} */}
                </Tabs>
            ) : (
                 // タブがない場合は直接リスト表示
                isLoading && basePosts.length > 0 ? <Elements.LoadingAnimation /> : <PostList posts={filteredPosts} postCardType={postCardType} />
            )}
        </div>
    );
};

const Posts = ({
    apiFetchType,
    syncWithUrl = false,
    pageTypeForTabs = apiFetchType, // デフォルトはapiFetchTypeと同じ
    showSearchInput = true,
    showCategoryTabs = true,
    showBudgetFilter = false,
    tabsGridColsClass,
    specificFilterType,
    specificFilterValue,
    postCardType = 1, // デフォルトのポストカードタイプ
}: PostsProps) => {
    return (
        <Suspense fallback={<Elements.LoadingAnimation />}>
            <PostsContent
                apiFetchType={apiFetchType}
                syncWithUrl={syncWithUrl}
                pageTypeForTabs={pageTypeForTabs}
                showSearchInput={showSearchInput}
                showCategoryTabs={showCategoryTabs}
                showBudgetFilter={showBudgetFilter}
                tabsGridColsClass={tabsGridColsClass}
                specificFilterType={specificFilterType}
                specificFilterValue={specificFilterValue}
                postCardType={postCardType}
            />
        </Suspense>
    )
}

export default Posts;
