/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://tomokichidiary.netlify.app/',
    changefreq: 'weekly',
    generateRobotsTxt: true, // robots.txt の生成を有効にする場合
    sitemapSize: 7000,
    outDir: './out',
    // 他のオプション（例：exclude, changefreq, priority など）も必要に応じて追加できます
}