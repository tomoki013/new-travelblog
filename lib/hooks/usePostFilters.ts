// lib/hooks/usePostFilters.ts
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Post } from '@/lib/types';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
    allCategories as defaultAllCategories, // 'allCategories' だと PostsWrapper 内の変数と衝突するためエイリアス
    diaryCategories,
    tourismCategories,
    itineraryCategories,
} from '@/data/categories';

interface UsePostFiltersParams {
    basePosts: Post[];
    initialKeyword?: string;
    initialCategory?: string;
    initialBudget?: string;
    syncWithUrl?: boolean;
    pageTypeForTabs?: 'all' | 'diary' | 'tourism' | 'itinerary'; // 表示するタブの種類を決定
}

export const usePostFilters = ({
    basePosts,
    initialKeyword = '',
    initialCategory = 'all',
    initialBudget = 'all',
    syncWithUrl = false,
    pageTypeForTabs = 'all', // デフォルトは全カテゴリタブ
}: UsePostFiltersParams) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const getInitialState = useCallback(
        (key: string, defaultValue: string) => {
            return syncWithUrl ? (searchParams.get(key) || defaultValue) : defaultValue;
        },
        [searchParams, syncWithUrl]
    );

    const [keyword, setKeyword] = useState(() => getInitialState('keyword', initialKeyword));
    const [activeTab, setActiveTab] = useState(() => getInitialState('category', initialCategory));
    const [budget, setBudget] = useState(() => getInitialState('budget', initialBudget));

    // URLパラメータの変更を監視し、内部状態を更新（syncWithUrlがtrueの場合）
    useEffect(() => {
        if (syncWithUrl) {
            setKeyword(searchParams.get('keyword') || initialKeyword);
            setActiveTab(searchParams.get('category') || initialCategory);
            setBudget(searchParams.get('budget') || initialBudget);
        }
    }, [searchParams, syncWithUrl, initialKeyword, initialCategory, initialBudget]);

    const updateUrl = useCallback((newParams: Record<string, string | undefined>) => {
        if (!syncWithUrl) return;
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        Object.entries(newParams).forEach(([key, value]) => {
            if (value && value !== 'all') { // 'all' はデフォルトなのでURLから削除
                current.set(key, value);
            } else {
                current.delete(key);
            }
        });
        const search = current.toString();
        const query = search ? `?${search}` : '';
        // router.push(`${pathname}${query}`, { scroll: false }); // pushだと履歴が残る
        router.replace(`${pathname}${query}`, { scroll: false }); // replaceで履歴が残らないようにする
    }, [syncWithUrl, router, pathname, searchParams]);

    const handleKeywordChange = (newKeyword: string) => {
        setKeyword(newKeyword);
        if (syncWithUrl) updateUrl({ keyword: newKeyword || undefined });
    };

    const handleTabChange = (newTab: string) => {
        setActiveTab(newTab);
        if (syncWithUrl) updateUrl({ category: newTab === 'all' ? undefined : newTab });
    };

    const handleBudgetChange = (newBudget: string) => {
        setBudget(newBudget);
        if (syncWithUrl) updateUrl({ budget: newBudget === 'all' ? undefined : newBudget });
    };

    const categoriesToDisplayForTabs = useMemo(() => {
        switch (pageTypeForTabs) {
            case 'diary': return diaryCategories;
            case 'tourism': return tourismCategories;
            case 'itinerary': return itineraryCategories;
            case 'all':
            default:
                return defaultAllCategories;
        }
    }, [pageTypeForTabs]);

    const getCategoryNameById = (id: string, categories: { id: string; name: string }[]) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : '';
    };

    // lib/hooks/usePostFilters.ts の filterロジック修正箇所 (一部抜粋)

    const filteredPosts = useMemo(() => {
        const searchKeywordsArray = keyword.toLowerCase().split(/\s+/).filter(Boolean);
        const matchesAllSearchKeywords = (text: string | undefined) =>
            searchKeywordsArray.every(k => text?.toLowerCase().includes(k));
    
        return basePosts.filter(post => {
            // Keyword filter
            const keywordMatch = searchKeywordsArray.length === 0 || (
                matchesAllSearchKeywords(post.title) ||
                post.tags?.some(tag => matchesAllSearchKeywords(tag)) ||
                post.category?.some(cat => matchesAllSearchKeywords(cat)) || // string[] を想定
                matchesAllSearchKeywords(post.excerpt) ||
                matchesAllSearchKeywords(post.content)
            );
            if (!keywordMatch) return false;
        
            // Budget filter (変更なし)
            if (budget && budget !== 'all') {
                 if (!post.budget) return false;
                 if (budget === '10万円以下' && post.budget > 100000) return false;
                 if (budget === '15万円以下' && post.budget > 150000) return false;
                 if (budget === '20万円以下' && post.budget > 200000) return false;
                 if (budget === '30万円以上' && post.budget <= 300000) return false;
            }
        
            // Category tab filter
            if (activeTab === 'all') return true;
        
            const tabCategoryName = getCategoryNameById(activeTab, categoriesToDisplayForTabs);
        
            if (pageTypeForTabs === 'all') { // 検索ページ
                // 記事のタイプ自体がタブIDと一致するか、または記事のカテゴリにタブ名が含まれるか
                return post.type === activeTab || (post.category && post.category.includes(tabCategoryName));
            }
            // 特定のリストページ (例: pageTypeForTabs === 'tourism')
            // 記事のカテゴリにタブ名が含まれるか
            return post.category && post.category.includes(tabCategoryName);
        });
    }, [keyword, activeTab, budget, basePosts, pageTypeForTabs, categoriesToDisplayForTabs]);

    return {
        keyword,
        activeTab,
        budget,
        filteredPosts,
        categoriesForTabs: categoriesToDisplayForTabs,
        handleKeywordChange,
        handleTabChange,
        handleBudgetChange,
    };
};
