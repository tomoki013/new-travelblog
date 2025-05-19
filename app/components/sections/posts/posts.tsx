'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as Elements from '@/app/components/elements/index';
import { Post } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const allCategories = [
    {id: 'all', name: 'すべて'},
    {id: 'diary', name: '旅行日記'},
    {id: 'tourism', name: '観光情報'},
    {id: 'itinerary', name: '旅程＆費用レポート'},
]

const diaryCategories = [
    {id: 'all', name: 'すべて'},
    {id: 'domestic', name: '国内旅行'},
    {id: 'international', name: '海外旅行'},
    {id: 'singleTrip', name: '一人旅'},
    {id: 'diving', name: 'ダイビング'},
    {id: 'others', name: 'その他'},
];

const tourismCategories = [
    {id: 'all', name: 'すべて'},
    {id: 'sightseeing', name: '観光スポット'},
    {id: 'food', name: 'グルメ'},
    {id: 'accommodation', name: '宿泊施設'},
    {id: 'transportation', name: '交通情報'},
    {id: 'pilgrimage', name: '聖地巡礼'},
];

const itineraryCategories = [
    {id: 'all', name: 'すべて'},
    {id: 'domestic', name: '国内旅行'},
    {id: 'international', name: '海外旅行'},
    {id: 'singleTrip', name: '一人旅'},
];

interface PostsProps {
    type: 'all' | 'diary' | 'tourism' | 'itinerary';
    filter?: 'region' | 'author';
    filterItem?: React.ReactNode;
    inputClassName?: string;
    tabListClassName?: string;
    budgetClassName?: string;
}

const Posts = ({
    type,
    filter,
    filterItem,
    inputClassName,
    tabListClassName,
    budgetClassName,
}: PostsProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理
    const [budgetFilter, setBudgetFilter] = useState<string>('all'); // 予算フィルターの状態を追加

    const tabCount = (type === 'diary' ? diaryCategories : type === 'tourism' ? tourismCategories : type === 'itinerary' ? itineraryCategories : allCategories).length;
    const gridColsClass = `grid-cols-${Math.min(tabCount, 6)}`; // 最大6列に制限

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true); // ローディング開始
            const res = await fetch(`/api/posts${type === 'all' ? '' : `?type=${type}`}`); // typeが指定されていない場合はクエリを省略
            const data = await res.json();
            setPosts(data.posts);
            setIsLoading(false); // ローディング終了
        };
        fetchPosts();
    }, [type]);

    useEffect(() => {
        const keywords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);

        const matchesAllKeywords = (text: string | undefined) =>
            keywords.every(keyword => text?.toLowerCase().includes(keyword));

        const tagMatches = posts.filter(post =>
            post.tags?.some(tag => matchesAllKeywords(tag))
        );
        const categoryMatches = posts.filter(
            post => !tagMatches.includes(post) && matchesAllKeywords(post.category)
        );
        const titleMatches = posts.filter(
            post => !tagMatches.includes(post) && !categoryMatches.includes(post) && matchesAllKeywords(post.title)
        );
        const descriptionMatches = posts.filter(
            post => !tagMatches.includes(post) && !categoryMatches.includes(post) && !titleMatches.includes(post) && matchesAllKeywords(post.excerpt)
        );
        const contentMatches = posts.filter(
            post => !tagMatches.includes(post) && !categoryMatches.includes(post) && !titleMatches.includes(post) && !descriptionMatches.includes(post) && matchesAllKeywords(post.content)
        );

        const budgetFilteredPosts = [...tagMatches, ...categoryMatches, ...titleMatches, ...descriptionMatches, ...contentMatches].filter(post => {
            if (!post.budget) return true;
            if (budgetFilter === 'all') return true;
            if (budgetFilter === '10万円以下') return post.budget <= 100000;
            if (budgetFilter === '15万円以下') return post.budget <= 150000;
            if (budgetFilter === '20万円以下') return post.budget <= 200000;
            if (budgetFilter === '30万円以上') return post.budget > 300000;
            return true;
        });

        setFilteredPosts(budgetFilteredPosts);
    }, [searchQuery, posts, budgetFilter]);

    return (
        <div>
            {isLoading ? ( // ローディング中はスピナーを表示
                <div className="flex justify-center items-center h-64">
                    <Elements.LoadingAnimation />
                </div>
            ) : (
                <>
                <div className='relative flex gap-4'>
                    <Input
                        type="text"
                        placeholder="検索キーワードを入力"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`" mb-4 w-full p-2 border border-gray-300 rounded " ${inputClassName}`}
                    />
                    <section className={budgetClassName || "hidden"}>
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
                <Tabs defaultValue="all" className="mb-10">
                    <TabsList className={`" mb-8 grid w-full h-auto grid-cols-2 sm:${gridColsClass} ${tabListClassName} "`}>
                        {(type === 'diary' ? diaryCategories : type === 'tourism' ? tourismCategories : type === 'itinerary' ? itineraryCategories : allCategories).map(cat => (
                            <TabsTrigger key={cat.id} value={cat.id}>
                                {cat.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    
                    <TabsContent value="all">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {(() => {
                                const regionFilteredPosts = filteredPosts.filter(post => {
                                    if (filter === 'region' && filterItem && typeof filterItem === 'string') {
                                        return post.location.includes(filterItem as string);
                                    }
                                    if (filter === 'author' && filterItem && typeof filterItem === 'string') {
                                        return post.author === filterItem;
                                    }
                                    return true;
                                });
                                return regionFilteredPosts.length === 0 ? (
                                    <p className="text-center col-span-full">該当の記事がありません。</p>
                                ) : (
                                    regionFilteredPosts.map(post => (
                                        <Elements.PostCard key={post.slug} post={post} linkPrefix={post.type || ''} />
                                    ))
                                );
                            })()}
                        </div>
                    </TabsContent>

                    {(type === 'diary' ? diaryCategories : type === 'tourism' ? tourismCategories : type === 'itinerary' ? itineraryCategories : allCategories).map(cat => (
                        cat.id !== 'all' && ( // "すべて" タブを除外
                            <TabsContent key={cat.id} value={cat.id}>
                                <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3`}>
                                    {(() => {
                                        const categoryFilteredPosts = filteredPosts.filter(post => {
                                            if (filter === 'region' && filterItem && typeof filterItem === 'string') {
                                                return post.location.includes(filterItem as string) && post.category?.includes(cat.name);
                                            }
                                            if (filter === 'author' && filterItem && typeof filterItem === 'string') {
                                                return post.author === filterItem && post.type === cat.id;
                                            }
                                            return post.category?.includes(cat.name) || post.type === cat.id;
                                        });
                                        return categoryFilteredPosts.length === 0 ? (
                                            <p className="text-center col-span-full">該当の記事がありません。</p>
                                        ) : (
                                            categoryFilteredPosts.map(post => (
                                                <Elements.PostCard key={post.slug} post={post} linkPrefix={post.type || ''} />
                                            ))
                                        );
                                    })()}
                                </div>
                            </TabsContent>
                        )
                    ))}
                </Tabs>
                </>
            )}
        </div>
    );
};

export default Posts;
