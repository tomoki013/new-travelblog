import { NextResponse } from 'next/server';
import getAllPosts from '@/lib/markdown';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'diary' | 'tourism' | 'itinerary' | null;

    if (type === 'diary') {
        const diaryPosts = getAllPosts('diary');
        return NextResponse.json({ posts: diaryPosts });
    }

    if (type === 'tourism') {
        const tourismPosts = getAllPosts('tourism');
        return NextResponse.json({ posts: tourismPosts });
    }
    
    if (type === 'itinerary') {
        const itineraryPosts = getAllPosts('itinerary');
        return NextResponse.json({ posts: itineraryPosts });
    }

    const diaryPosts = getAllPosts('diary');
    const tourismPosts = getAllPosts('tourism');
    const itineraryPosts = getAllPosts('itinerary');
    const allPosts = [...diaryPosts, ...tourismPosts, ...itineraryPosts];

    return NextResponse.json({ posts: allPosts });
}
