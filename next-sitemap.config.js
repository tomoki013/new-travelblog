import { getAllPostTypes } from '@/lib/markdown'; // lib/markdown.tsから関数をインポート
import { regions } from '@/data/regions'; // data/regions.tsからデータをインポート

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://tomokichidiary.netlify.app/',
    changefreq: 'weekly',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    outDir: './public',

    // 動的ルートのURLを生成する関数を追加
    transform: async (config, path) => {
        return {
            loc: path, // ==> /<path>
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
    },

    // 動的に追加したいパスをここで生成
    additionalPaths: async () => {
        const allPosts = getAllPostTypes();
        const results = []

        // 各記事ページのパスを生成
        allPosts.forEach(post => {
            results.push({
                loc: `/${post.type}/${post.slug}`,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: new Date(post.dates[0]).toISOString(),
            });
        });

        // 著者ページのパスを生成
        const authors = [...new Set(allPosts.map(post => post.author))];
        authors.forEach(author => {
            results.push({
                loc: `/personal/${encodeURIComponent(author)}`,
                changefreq: 'monthly',
                priority: 0.5,
            });
        });

        // 地域ページのパスを生成
        regions.forEach(region => {
            results.push({
                loc: `/tourism/region/${encodeURIComponent(region.city)}`,
                changefreq: 'monthly',
                priority: 0.6,
            });
        });

        return results;
    },
}
