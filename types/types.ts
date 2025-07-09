export interface Post {
    slug: string
    title: string
    dates: string[]
    content: string
    excerpt: string
    image: string
    category: string[]
    location: string[]
    author: string
    tags: string[]
    budget?: number
    costs?: Record<string, number>
    type: 'diary' | 'tourism' | 'itinerary'; // 投稿のタイプを追加
}

export interface Photo {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    category: string;
    likes: number;
}

export interface Author {
    name: string;
    role: string;
    description: string;
    image: string;
}
