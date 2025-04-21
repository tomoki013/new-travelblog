import { NextResponse } from 'next/server';
import getAllPosts from '@/lib/markdown';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'diary' | 'tourism' | null;

    if (type === 'diary') {
        const diaryPosts = getAllPosts('diary');
        return NextResponse.json({ posts: diaryPosts });
    }

    if (type === 'tourism') {
        const tourismPosts = getAllPosts('tourism');
        return NextResponse.json({ posts: tourismPosts });
    }

    const diaryPosts = getAllPosts('diary');
    const tourismPosts = getAllPosts('tourism');
    const allPosts = [...diaryPosts, ...tourismPosts];

    return NextResponse.json({ posts: allPosts });
}
