"use client";

import { useEffect, useState } from 'react';
import { Post } from '@/lib/types';

interface UseFilteredPostsProps {
  posts: Post[];
  searchQuery: string;
  budgetFilter: string;
}

const useFilteredPosts = ({ posts, searchQuery, budgetFilter }: UseFilteredPostsProps) => {
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

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

    return filteredPosts;
}

export { useFilteredPosts };
