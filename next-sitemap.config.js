import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// lib/markdown.ts のロジックをこのファイル内に再現
const postsDirectory = path.join(process.cwd(), 'posts');

function getPostSlugs(type) {
    const typeDirectory = path.join(postsDirectory, type);
    if (!fs.existsSync(typeDirectory)) {
        return [];
    }
    return fs.readdirSync(typeDirectory)
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace(/\.md$/, ''));
}

function getPostBySlug(type, slug) {
    const fullPath = path.join(postsDirectory, type, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
        slug,
        type,
        dates: data.dates,
        author: data.author,
    };
}

function getAllPosts(type) {
    const slugs = getPostSlugs(type);
    return slugs.map(slug => getPostBySlug(type, slug)).filter(Boolean);
}

function getAllPostTypes() {
    const postTypes = ['diary', 'tourism', 'itinerary'];
    let allPosts = [];
    for (const type of postTypes) {
        allPosts = allPosts.concat(getAllPosts(type));
    }
    return allPosts;
}

// data/regions.ts のデータを直接読み込み
let regions = [];
try {
    const regionsDataPath = path.join(process.cwd(), 'data/regions.ts');
    const regionsFileContent = fs.readFileSync(regionsDataPath, 'utf-8');
    // ファイルから配列部分を文字列として抽出し、JSONとしてパース可能な形式に変換
    const arrayString = regionsFileContent.substring(
        regionsFileContent.indexOf('['),
        regionsFileContent.lastIndexOf(']') + 1
    ).replace(/,(\s*\])/g, '$1'); // 末尾のカンマを削除
    regions = JSON.parse(arrayString.replace(/'/g, '"')); // シングルクオートをダブルクオートに置換
} catch (e) {
    console.error("Could not parse regions.ts. Make sure it contains a valid array.", e);
}


/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://tomokichidiary.netlify.app/',
    changefreq: 'weekly',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    outDir: './public',
    
    // 動的に追加したいパスをここで生成
    additionalPaths: async () => {
        const allPosts = getAllPostTypes();
        const results = [];

        // 各記事ページのパスを生成
        allPosts.forEach(post => {
            if (post.slug && post.type && post.dates) {
                results.push({
                    loc: `/${post.type}/${post.slug}`,
                    changefreq: 'weekly',
                    priority: 0.7,
                    lastmod: new Date(post.dates[0]).toISOString(),
                });
            }
        });

        // 著者ページのパスを生成（重複を排除）
        const authors = [...new Set(allPosts.map(post => post.author).filter(Boolean))];
        authors.forEach(author => {
            results.push({
                loc: `/personal/${encodeURIComponent(author)}`,
                changefreq: 'monthly',
                priority: 0.5,
            });
        });

        // 地域ページのパスを生成
        if (Array.isArray(regions)) {
            regions.forEach(region => {
                if (region.city) {
                    results.push({
                        loc: `/tourism/region/${encodeURIComponent(region.city.toLowerCase())}`,
                        changefreq: 'monthly',
                        priority: 0.6,
                    });
                }
            });
        }

        return results;
    },
};

export default config;
