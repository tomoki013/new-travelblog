import { NextResponse } from 'next/server';
import getAllPosts from '@/lib/markdown';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase() || '';
    const type = (searchParams.get('type') as 'diary' | 'tourism') || 'diary';
    const posts = getAllPosts(type);

    // キーワードをスペースで分割してAND検索を実現
    const keywords = q.split(/\s+/).filter(Boolean);

    const matchesAllKeywords = (text: string | undefined) =>
        keywords.every(keyword => text?.toLowerCase().includes(keyword));

    // フィルタリングロジック: tags → category → title → description → content の順に優先
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

    const results = [...tagMatches, ...categoryMatches, ...titleMatches, ...descriptionMatches, ...contentMatches];

    return NextResponse.json({ results });
}
