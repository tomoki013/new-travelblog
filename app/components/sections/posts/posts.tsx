// app/components/sections/posts/posts.tsx
'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as Elements from '@/app/components/elements/index';
import { Post } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { allCategories, diaryCategories, tourismCategories, itineraryCategories } from '@/data/categories';
import { useFilteredPosts } from './useFilteredPosts';

interface PostsProps {
    type: 'all' | 'diary' | 'tourism' | 'itinerary';
    filter?: 'region' | 'author';
    filterItem?: React.ReactNode;
    inputClassName?: string;
    tabListClassName?: string;
    budgetClassName?: string;
    gridColsClass?: string;
    initialSearchQuery?: string; // New prop
    initialCategoryFilter?: string; // New prop
}

const Posts = ({
    type,
    filter,
    filterItem,
    inputClassName,
    tabListClassName,
    budgetClassName,
    gridColsClass = 'sm:grid-cols-6',
    initialSearchQuery = '', // Default to empty
    initialCategoryFilter = 'all', // Default to 'all'
}: PostsProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery); // Initialize with prop
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [budgetFilter, setBudgetFilter] = useState<string>('all');
    const [activeTab, setActiveTab] = useState<string>(initialCategoryFilter); // Initialize active tab

    useEffect(() => {
        // If initialCategoryFilter is passed and is a valid category for the current `type`, set it as active tab.
        const categoriesForType = type === 'diary' ? diaryCategories :
                                 type === 'tourism' ? tourismCategories :
                                 type === 'itinerary' ? itineraryCategories : allCategories;
        if (categoriesForType.some(cat => cat.id === initialCategoryFilter)) {
            setActiveTab(initialCategoryFilter);
        } else {
            setActiveTab('all'); // Default to 'all' if not valid or not provided
        }
    }, [initialCategoryFilter, type]);


    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            // Fetch all posts if the search comes from the hero section,
            // then filter client-side by the specific category passed in `initialCategoryFilter` if it's not 'all'.
            // Or, if `type` is specific, fetch only those.
            const fetchType = (type === 'all' && initialCategoryFilter !== 'all' && ['diary', 'tourism', 'itinerary'].includes(initialCategoryFilter))
                ? initialCategoryFilter as 'diary' | 'tourism' | 'itinerary' // Fetch specific type if category is specific
                : type; // Otherwise, use the general type prop

            const res = await fetch(`/api/posts${fetchType === 'all' ? '' : `?type=${fetchType}`}`);
            const data = await res.json();
            setPosts(data.posts);
            setIsLoading(false);
        };
        fetchPosts();
    }, [type, initialCategoryFilter]); // Re-fetch if type or initialCategoryFilter changes

    const postsToFilter = posts; // Start with all fetched posts

    // Further filter by category if the main type is 'all' but a specific category was selected in search hero
    // This is a client-side filter after fetching.
    const categoryFilteredForSearch = (type === 'all' && initialCategoryFilter !== 'all')
        ? postsToFilter.filter(post => post.type === initialCategoryFilter || post.category?.includes(getCategoryNameById(initialCategoryFilter, allCategories)))
        : postsToFilter;


    const filteredPostsFromHook = useFilteredPosts({
      posts: categoryFilteredForSearch, // Use the potentially pre-filtered list
      searchQuery,
      budgetFilter
    });


    // Helper function to get category name from id
    const getCategoryNameById = (id: string, categories: { id: string; name: string }[]) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : '';
    };

    const categoriesToDisplay = type === 'diary' ? diaryCategories :
                                type === 'tourism' ? tourismCategories :
                                type === 'itinerary' ? itineraryCategories : allCategories;

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Elements.LoadingAnimation />
                </div>
            ) : (
                <>
                <div className={`relative flex gap-4 ${inputClassName ? '' : 'mb-4'}`}>
                    <Input
                        type="text"
                        placeholder="記事内を検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full p-2 border border-gray-300 rounded ${inputClassName}`}
                    />
                    <section className={budgetClassName || "hidden"}>
                        {/* Budget filter remains the same */}
                        <Select value={budgetFilter} onValueChange={setBudgetFilter}>
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
                    </section>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
                    <TabsList className={`mb-8 grid w-full h-auto grid-cols-2 ${gridColsClass} ${tabListClassName}`}>
                        {categoriesToDisplay.map(cat => (
                            <TabsTrigger key={cat.id} value={cat.id}>
                                {cat.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {categoriesToDisplay.map(cat => (
                        <TabsContent key={cat.id} value={cat.id}>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {(() => {
                                    // Apply tab-based category filtering on top of search keyword filtering
                                    const tabCategoryName = getCategoryNameById(cat.id, categoriesToDisplay);
                                    const finalFilteredPosts = filteredPostsFromHook.filter(post => {
                                        if (cat.id === 'all') return true; // 'すべて' tab shows all from filteredPostsFromHook

                                        // For specific category tabs
                                        if (filter === 'region' && filterItem && typeof filterItem === 'string') {
                                            return post.location.includes(filterItem) && (post.category?.includes(tabCategoryName) || post.type === cat.id);
                                        }
                                        if (filter === 'author' && filterItem && typeof filterItem === 'string') {
                                            return post.author === filterItem && (post.category?.includes(tabCategoryName) || post.type === cat.id);
                                        }
                                        return post.category?.includes(tabCategoryName) || post.type === cat.id;
                                    });

                                    return finalFilteredPosts.length === 0 ? (
                                        <p className="text-center col-span-full">該当の記事がありません。</p>
                                    ) : (
                                        finalFilteredPosts.map(post => (
                                            <Elements.PostCard key={post.slug} post={post} linkPrefix={post.type || ''} />
                                        ))
                                    );
                                })()}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
                </>
            )}
        </div>
    );
};

export default Posts;