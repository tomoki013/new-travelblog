// app/components/sections/posts/PostFiltersUI.tsx
"use client";

import * as Elements from '@/app/components/elements/index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PostFiltersUIProps {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    activeTab: string;
    onTabChange: (tab: string) => void;
    budget: string;
    onBudgetChange: (budget: string) => void;
    categories: { id: string; name: string }[]; // 表示するタブのカテゴリリスト
    showSearchInput?: boolean;
    showCategoryTabs?: boolean;
    showBudgetFilter?: boolean;
    inputClassName?: string;
    tabListClassName?: string;
    budgetFilterClassName?: string;
    tabsGridColsClass?: string;
}

export const PostFiltersUI = ({
    keyword,
    onKeywordChange,
    budget,
    onBudgetChange,
    categories,
    showSearchInput = true,
    showCategoryTabs = true,
    showBudgetFilter = false,
    inputClassName,
    tabListClassName,
    budgetFilterClassName,
    tabsGridColsClass = 'sm:grid-cols-3 md:grid-cols-6',
}: PostFiltersUIProps) => {
    return (
        <>
            {showSearchInput && (
                <div className={`relative flex flex-col sm:flex-row gap-4 mb-4 ${inputClassName}`}>
                    <Elements.SearchBox
                        initialKeyword={keyword}
                        onSearch={onKeywordChange}
                        className="w-full"
                        mode="realtime"
                    />
                    {showBudgetFilter && (
                        <div className={`w-full sm:w-auto ${budgetFilterClassName}`}>
                            <Select value={budget} onValueChange={onBudgetChange}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="予算範囲" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">すべて</SelectItem>
                                    <SelectItem value="10万円以下">10万円以下</SelectItem>
                                    <SelectItem value="15万円以下">15万円以下</SelectItem>
                                    <SelectItem value="20万円以下">20万円以下</SelectItem>
                                    <SelectItem value="30万円以上">30万円以上</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            )}
            {showCategoryTabs && (
                // Tabsコンポーネント自体はPostsWrapperに移動し、ここではTabsListのみをレンダリング
                <TabsList className={`mb-8 grid w-full h-auto grid-cols-2 ${tabsGridColsClass} ${tabListClassName}`}>
                    {categories.map(cat => (
                        <TabsTrigger key={cat.id} value={cat.id}>
                            {cat.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            )}
        </>
    );
};
