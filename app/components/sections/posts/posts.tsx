'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as Elements from '@/app/components/elements/index';
import type { Post } from '@/lib/markdown';

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

interface PostsProps {
    type: 'diary' | 'tourism' | 'itinerary';
    filter?: 'region' | 'author';
    filterItem?: React.ReactNode;
    inputClassName?: string;
    tabListClassName?: string;
}

const Posts = ({
    type,
    filter,
    filterItem,
    inputClassName,
    tabListClassName,
}: PostsProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true); // ローディング開始
            const res = await fetch(`/api/posts?type=${type}`);
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

        setFilteredPosts([...tagMatches, ...categoryMatches, ...titleMatches, ...descriptionMatches, ...contentMatches]);
    }, [searchQuery, posts]);

    return (
        <div>
            {isLoading ? ( // ローディング中はスピナーを表示
                <div className="flex justify-center items-center h-64">
                    <Elements.LoadingAnimation />
                </div>
            ) : (
                <>
                <input
                    type="text"
                    placeholder="検索キーワードを入力"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`" mb-4 w-full p-2 border border-gray-300 rounded " ${inputClassName}`}
                />
                <Tabs defaultValue="all" className="mb-10">
                    <TabsList className={`" mb-8 grid w-full grid-cols-2 sm:grid-cols-6 h-auto " ${tabListClassName}`}>
                        {(type === 'diary' ? diaryCategories : tourismCategories).map(cat => (
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
                                    return true;
                                });
                                return regionFilteredPosts.length === 0 ? (
                                    <p className="text-center col-span-full">該当の記事がありません。</p>
                                ) : (
                                    regionFilteredPosts.map(post => (
                                        <Elements.PostCard key={post.slug} post={post} linkPrefix={type} />
                                    ))
                                );
                            })()}
                        </div>
                    </TabsContent>

                    {(type === 'diary' ? diaryCategories : tourismCategories).map(cat => (
                        cat.id !== 'all' && ( // "すべて" タブを除外
                            <TabsContent key={cat.id} value={cat.id}>
                                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {(() => {
                                        const categoryFilteredPosts = filteredPosts.filter(post => {
                                            if (filter === 'region' && filterItem && typeof filterItem === 'string') {
                                                return post.location.includes(filterItem as string) && post.category?.includes(cat.name);
                                            }
                                            return post.category?.includes(cat.name);
                                        });
                                        return categoryFilteredPosts.length === 0 ? (
                                            <p className="text-center col-span-full">該当の記事がありません。</p>
                                        ) : (
                                            categoryFilteredPosts.map(post => (
                                                <Elements.PostCard key={post.slug} post={post} linkPrefix={type} />
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
