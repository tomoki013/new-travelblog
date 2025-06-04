export interface Post {
    slug: string
    title: string
    dates: string[]
    content: string
    excerpt: string
    image: string
    category: string[]
    location: string
    author: string
    tags: string[]
    budget?: number
    type: 'diary' | 'tourism' | 'itinerary'; // 投稿のタイプを追加
}
