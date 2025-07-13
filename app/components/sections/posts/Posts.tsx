"use client";

import { Suspense, useEffect, useState } from 'react';
import * as Elements from '@/app/components/elements/index';
import { Post } from '@/types/types';
import { usePostFilters } from '@/lib/hooks/usePostFilters';
import { PostFiltersUI } from './PostFiltersUI';
import { PostList } from './PostList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams } from 'next/navigation';

interface PostsProps {
    // 初期データとして直接Post[]を受け取る
    initialPosts: Post[];
    // フィルタリング対象のタイプ
    postFilterType: 'all' | 'diary' | 'tourism' | 'itinerary';
    // URL同期を行うか (検索ページではtrue, 他のリストページではfalse)
    syncWithUrl?: boolean;
    // ページの種類に応じて表示するタブのカテゴリリストを決定
    pageTypeForTabs?: 'all' | 'diary' | 'tourism' | 'itinerary';

    // UI要素の表示/非表示フラグ
    showSearchInput?: boolean;
    showCategoryTabs?: boolean;
    showBudgetFilter?: boolean;

    // UI要素のクラス名カスタマイズ用
    tabsGridColsClass?: string;
    postsGridColsClass?: string;

    // ページ固有の事前フィルタリング用 (例: /tourism/region/[city] の場合)
    specificFilterType?: 'region' | 'author';
    specificFilterValue?: string;

    // ポストカードのタイプを指定
    postCardType?: number;

    // 表示する投稿の最大数を指定
    displayCount?: number;

    // 該当の記事がない場合のメッセージ
    textForIsPosts?: string;
}

const PostsContent = ({
    initialPosts,
    postFilterType,
    syncWithUrl = false,
    pageTypeForTabs = postFilterType,
    showSearchInput = true,
    showCategoryTabs = true,
    showBudgetFilter = false,
    tabsGridColsClass,
    specificFilterType,
    specificFilterValue,
    postCardType = 1,
    displayCount,
    postsGridColsClass = 'sm:grid-cols-2 lg:grid-cols-3',
    textForIsPosts = '該当の記事がありません。',
}: PostsProps) => {
    const [basePosts, setBasePosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const searchParams = useSearchParams();
    const initialKeyword = syncWithUrl ? (searchParams.get('keyword') || '') : '';
    const initialCategory = syncWithUrl ? (searchParams.get('category') || 'all') : 'all';
    const initialBudget = syncWithUrl ? (searchParams.get('budget') || 'all') : 'all';

    useEffect(() => {
        const processInitialPosts = () => {
            setIsLoading(true);
            
            let postsToFilter = [...initialPosts];

            // postFilterTypeに基づいてフィルタリング
            if (postFilterType !== 'all') {
                postsToFilter = postsToFilter.filter(post => post.type === postFilterType);
            }

            // ページ固有の事前フィルタリング
            if (specificFilterType && specificFilterValue) {
                postsToFilter = postsToFilter.filter(post => {
                    if (specificFilterType === 'region') {
                        return post.location.some(loc => 
                            loc.toLowerCase().includes(specificFilterValue.toLowerCase())
                        );
                    }
                    if (specificFilterType === 'author') {
                        return post.author === specificFilterValue;
                    }
                    return true;
                });
            }

            setBasePosts(postsToFilter);
            setIsLoading(false);
        };

        processInitialPosts();
    }, [initialPosts, postFilterType, specificFilterType, specificFilterValue]);

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

    // displayCountに基づいて表示する投稿を制限する
    const postsToDisplay = displayCount ? filteredPosts.slice(0, displayCount) : filteredPosts;

    if (isLoading && basePosts.length === 0) {
        return <Elements.LoadingAnimation />;
    }

    return (
        <div>
            <PostFiltersUI
                keyword={keyword}
                onKeywordChange={handleKeywordChange}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                budget={budget}
                onBudgetChange={handleBudgetChange}
                categories={categoriesForTabs}
                showSearchInput={showSearchInput}
                showCategoryTabs={false}
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
                    <TabsContent value={activeTab} forceMount>
                        {isLoading && basePosts.length > 0 ? (
                            <Elements.LoadingAnimation />
                        ) : (
                            <PostList posts={postsToDisplay} postCardType={postCardType} postsGridColsClass={postsGridColsClass} textForIsPosts={textForIsPosts} />
                        )}
                    </TabsContent>
                </Tabs>
            ) : (
                isLoading && basePosts.length > 0 ? (
                    <Elements.LoadingAnimation />
                ) : (
                    <PostList posts={postsToDisplay} postCardType={postCardType} postsGridColsClass={postsGridColsClass} textForIsPosts={textForIsPosts} />
                )
            )}
        </div>
    );
};

const Posts = (props: PostsProps) => {
    return (
        <Suspense fallback={<Elements.LoadingAnimation />}>
            <PostsContent {...props} />
        </Suspense>
    );
};

export default Posts;
