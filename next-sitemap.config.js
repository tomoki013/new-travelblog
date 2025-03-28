/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://tomokichidiary.netlify.app/',
    changefreq: 'weekly',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    outDir: './public',
    // 他のオプション（例：exclude, changefreq, priority など）も必要に応じて追加
}