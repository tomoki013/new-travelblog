'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Post } from '@/lib/markdown';
import * as Elements from '@/app/components/elements/index';

const diaryCategories = [
    { id: 'all', name: 'すべて' },
    { id: 'domestic', name: '国内旅行' },
    { id: 'international', name: '海外旅行' },
    { id: 'singleTrip', name: '一人旅' },
    { id: 'others', name: 'その他' },
];

const tourismCategories = [
    { id: 'all', name: 'すべて' },
    { id: 'sightseeing', name: '観光スポット' },
    { id: 'food', name: 'グルメ' },
    { id: 'accommodation', name: '宿泊施設' },
    { id: 'transportation', name: '交通情報' },
    { id: 'pilgrimage', name: '聖地巡礼' },
];

interface SearchBoxProps {
    type: 'diary' | 'tourism';
}

const SearchBox = ({ type }: SearchBoxProps) => {
    const [q, setQ] = useState('');
    const [results, setResults] = useState<Post[]>([]);
    const [activeTab, setActiveTab] = useState('all');

    const categories = type === 'diary' ? diaryCategories : tourismCategories;

    useEffect(() => {
        const controller = new AbortController();
        if (q.length < 2) {
            const endpoint = type === 'diary' ? '/api/posts?type=diary' : '/api/posts?type=tourism';
            fetch(endpoint, { signal: controller.signal })
                .then((res) => res.json())
                .then((data) => {
                    if (data.posts) {
                        setResults(data.posts);
                    }
                })
                .catch((err) => {
                    if (err.name !== 'AbortError') console.error(err);
                });
            return;
        }
        fetch(`/api/search?q=${encodeURIComponent(q)}&type=${type}`, {
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((data) => setResults(data.results))
            .catch((err) => {
                if (err.name !== 'AbortError') console.error(err);
            });
        return () => controller.abort();
    }, [q, type]);

    const filteredResults = results.filter((post) => {
        if (activeTab === 'all') return true;
        return post.category?.includes(
            categories.find((cat) => cat.id === activeTab)?.name || ''
        );
    });

    return (
        <div className="mb-6">
            <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="記事を検索..."
                className="w-full p-2 border rounded"
            />
            {q.length >= 2 && (
                <Tabs
                    defaultValue="all"
                    className="mt-6"
                    onValueChange={(value) => setActiveTab(value)}
                >
                    <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-6 h-auto">
                        {categories.map((cat) => (
                            <TabsTrigger key={cat.id} value={cat.id}>
                                {cat.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {categories.map((cat) => (
                        <TabsContent key={cat.id} value={cat.id}>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredResults.map((post) => (
                                    <Elements.PostCard
                                        key={post.slug}
                                        post={post}
                                        linkPrefix={type}
                                    />
                                ))}
                                {filteredResults.length === 0 && (
                                    <p>該当する記事がありません。</p>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    );
}

export default SearchBox;
