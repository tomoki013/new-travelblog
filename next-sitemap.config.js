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

let regions = [];

try {
    // --- 1. ファイルの読み込み ---
    // 処理の対象となるファイルのパスを解決します。
    const regionsDataPath = path.join(process.cwd(), './data/regions.ts');
    const regionsFileContent = fs.readFileSync(regionsDataPath, 'utf-8');

    // --- 2. TypeScriptコードの前処理 ---
    // vmで実行するために、TypeScript特有の構文（import/export/型定義）を削除します。
    // これにより、プレーンなJavaScriptとして解釈できるようになります。

    // import文を削除 (例: import ... from '...')
    // `m`フラグは複数行モードを有効にし、`^`が各行の先頭にマッチするようにします。
    let scriptContent = regionsFileContent.replace(/^import .*$/gm, '');
    
    // exportキーワードを削除
    scriptContent = scriptContent.replace(/export /g, '');
    
    // 型定義を削除 (例: `: regionProps[]`)
    // 変数名と'='の間にある': 型'の部分を正規表現で削除します。
    // `.*?`は非貪欲マッチ、`(?=\s*=)`は肯定的先読みで、`=`の直前までをマッチ対象とします。
    scriptContent = scriptContent.replace(/:.*?(?=\s*=)/g, '');


    // --- 3. vmモジュールを使用して安全にJavaScriptとして評価 ---
    // vm.runInContextは、提供されたコンテキスト（サンドボックス）内でJavaScriptコードを実行します。
    // これにより、ファイル内で定義された変数がコンテキストオブジェクトのプロパティになります。
    const context = {};
    vm.createContext(context); // 空のサンドボックスコンテキストを作成
    vm.runInContext(scriptContent, context);

    // --- 4. 結果の取得 ---
    // スクリプトの実行後、コンテキスト内にはファイルで定義された`regions`変数が格納されています。
    // これを直接取得します。
    if (context.regions) {
        regions = context.regions;
        console.log("正常にregions.tsをパースしました:", regions);
    } else {
        throw new Error("ファイル内に 'regions' という名前の配列が見つかりませんでした。");
    }

} catch (e) {
    // エラーハンドリング
    console.error("regions.tsのパースに失敗しました。", e);
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
                    priority: 0.8,
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
