import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type PostType = 'diary' | 'tourism'

export interface Post {
    slug: string
    title: string
    date: string
    content: string
    excerpt: string
    image: string
    category: string
    location: string
    author: string
    authorImage: string
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
        date: data.date,
        content,
        excerpt: data.excerpt,
        image: data.image,
        category: data.category,
        location: data.location,
        author: data.author,
        authorImage: data.authorImage,
        tags: data.tags || [],
    }
}

export default function getAllPosts(type: PostType): Post[] {
    const slugs = getPostSlugs(type);
    const posts = slugs
        .map(slug => getPostBySlug(type, slug))
        .sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime())
    return posts
}
