import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type PostType = 'diary' | 'tourism' | 'itinerary'

export interface Post {
    slug: string
    title: string
    dates: string[] // 型を配列に変更
    content: string
    excerpt: string
    image: string
    category: string
    location: string
    author: string
    tags: string[]
}

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostSlugs(type: PostType): string[] {
    const typeDirectory = path.join(postsDirectory, type);
    return fs.readdirSync(typeDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))
}

export function getPostBySlug(type: PostType, slug: string): Post {
    const fullPath = path.join(postsDirectory, type, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title,
        dates: Array.isArray(data.dates) ? data.dates : [data.dates], // 配列に変換
        content,
        excerpt: data.excerpt,
        image: data.image,
        category: data.category,
        location: data.location,
        author: data.author,
        tags: data.tags || [],
    }
}

export default function getAllPosts(type: PostType): Post[] {
    const slugs = getPostSlugs(type);
    const posts = slugs
        .map(slug => getPostBySlug(type, slug))
        .sort((a, b) => {
            const dateA = new Date(a.dates[0]).getTime(); // 配列の最初の要素を使用
            const dateB = new Date(b.dates[0]).getTime(); // 配列の最初の要素を使用
            if (dateA === dateB) {
                return b.dates.length - a.dates.length; // 配列の長さで比較
            }
            return dateB - dateA;
        });
    return posts;
}
