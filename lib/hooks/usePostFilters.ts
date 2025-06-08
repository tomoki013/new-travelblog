// lib/hooks/usePostFilters.ts
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Post } from '@/types/types';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
    allCategories as defaultAllCategories,
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
    pageTypeForTabs?: 'all' | 'diary' | 'tourism' | 'itinerary';
}

// スコア計算ロジックをフックの外、またはフックの最上部に定義
const calculatePostScore = (post: Post, searchKeywordsArray: string[]): number => {
    // キーワードが指定されていない場合は、全ての記事にデフォルトスコア1を付与 (または0にして後続処理で扱う)
    if (searchKeywordsArray.length === 0) return 1;

    let score = 0;
    const lowerKeywords = searchKeywordsArray.map(k => k.toLowerCase());

    // 複数のキーワード全てにヒットするかどうかをチェックするヘルパー関数
    // textInputが文字列配列の場合(tags, category)、いずれかの要素にキーワードが含まれればOK (OR検索的に)
    // AND検索にしたい場合は、全キーワードが同一要素内にあるか、または全キーワードが配列内のいずれかの要素にヒットするかを調整する必要がある。
    // ここでは、各キーワードがtextInput内のいずれかの要素に含まれていれば良い、というAND検索に近い形で実装。
    const checkMatch = (textInput: string | string[] | undefined): boolean => {
        if (!textInput) return false;
        const textsToSearch = Array.isArray(textInput)
            ? textInput.map(t => t.toLowerCase())
            : [textInput.toLowerCase()];

        // 全てのキーワードが、与えられたテキスト（群）のいずれかに部分一致するか
        return lowerKeywords.every(keyword =>
            textsToSearch.some(text => text.includes(keyword))
        );
    };

    // 各フィールドの重み付け (この値は調整可能です)
    const weights = {
        title: 10,
        location: 7,
        tags: 5,
        category: 5, // フロントマターのcategoryフィールド
        excerpt: 3,
        content: 1,
        author: 1,
    };

    if (checkMatch(post.title)) {
        score += weights.title;
    }
    if (post.location && checkMatch(post.location)) { // post.location は string[] を想定
        score += weights.location;
    }
    if (post.tags && checkMatch(post.tags)) { // post.tags は string[]
        score += weights.tags;
    }
    if (post.category && checkMatch(post.category)) { // post.category は string[] を想定
        score += weights.category;
    }
    if (checkMatch(post.excerpt)) {
        score += weights.excerpt;
    }
    if (checkMatch(post.content)) {
        score += weights.content;
    }
    if (checkMatch(post.author)) {
        score += weights.author;
    }

    return score;
};


export const usePostFilters = ({
    basePosts,
    initialKeyword = '',
    initialCategory = 'all',
    initialBudget = 'all',
    syncWithUrl = false,
    pageTypeForTabs = 'all',
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
            if (value && value !== 'all') {
                current.set(key, value);
            } else {
                current.delete(key);
            }
        });
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.replace(`${pathname}${query}`, { scroll: false });
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

    const getCategoryNameById = useCallback((id: string, categories: { id: string; name: string }[]) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : '';
    }, []);

    const filteredPosts = useMemo(() => {
        const searchKeywordsArray = keyword.toLowerCase().split(/\s+/).filter(Boolean);

        // 1. スコアリング
        const scoredPosts = basePosts.map(post => ({
            ...post,
            score: calculatePostScore(post, searchKeywordsArray),
        }));

        // 2. キーワードによるフィルタリング（スコアが0より大きいもの）
        //    およびスコアによるソート
        const keywordFilteredAndSortedPosts = scoredPosts
            .filter(post => {
                // キーワードが入力されている場合、スコアが0の記事は除外
                if (searchKeywordsArray.length > 0 && post.score === 0) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => b.score - a.score); // スコアの高い順にソート

        // 3. 予算とカテゴリタブでさらにフィルタリング
        return keywordFilteredAndSortedPosts.filter(post => {
            // Budget filter
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

            if (pageTypeForTabs === 'all') {
                // 記事のタイプ自体がタブIDと一致するか、または記事のカテゴリにタブ名が含まれるか
                return post.type === activeTab || (post.category && post.category.includes(tabCategoryName));
            }
            // 特定のリストページ (例: pageTypeForTabs === 'tourism')
            // 記事のカテゴリにタブ名が含まれるか
            return post.category && post.category.includes(tabCategoryName);
        });
    }, [keyword, activeTab, budget, basePosts, pageTypeForTabs, categoriesToDisplayForTabs, getCategoryNameById]);

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
