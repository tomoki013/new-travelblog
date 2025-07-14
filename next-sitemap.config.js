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
    // --- 1. ファイルの読み込み ---
    // 処理の対象となるファイルのパスを解決します。
    const regionsDataPath = path.join(process.cwd(), './data/regions.ts');
    const regionsFileContent = fs.readFileSync(regionsDataPath, 'utf-8');

    // --- 2. 配列リテラルの部分を文字列として抽出 ---
    // ファイル内容から配列の開始 `[` と終了 `]` を探し、その間の文字列を抽出します。
    // この方法は、ファイル内に配列が1つだけ定義されていることを前提としています。
    const arrayStartIndex = regionsFileContent.indexOf('[');
    const arrayEndIndex = regionsFileContent.lastIndexOf(']') + 1;

    // 配列が見つからない場合はエラーをスローします。
    if (arrayStartIndex === -1 || arrayEndIndex === 0) {
        throw new Error("ファイル内に配列 '[]' が見つかりませんでした。");
    }

    const arrayLiteralString = regionsFileContent.substring(arrayStartIndex, arrayEndIndex);

    // --- 3. vmモジュールを使用して安全にJavaScriptとして評価 ---
    // vmモジュールは、現在のスコープから隔離された安全なサンドボックス環境を提供します。
    // これにより、eval()のようなセキュリティリスクを避けつつ、動的にコードを実行できます。

    // 実行するスクリプトを作成します。
    // サンドボックス内の `data` という変数に、抽出した配列リテラルを代入します。
    const script = new vm.Script(`data = ${arrayLiteralString}`);

    // スクリプトを実行するためのコンテキスト（サンドボックス環境）を作成します。
    const context = { data: null };
    vm.createContext(context);

    // 作成したコンテキスト内でスクリプトを実行します。
    script.runInContext(context);

    // --- 4. 結果の取得 ---
    // スクリプトの実行後、コンテキスト内の `data` 変数に格納された配列を取得します。
    // これで、文字列操作ではなく、JavaScriptエンジンによって正しく解釈されたオブジェクトが得られます。
    regions = context.data;

    console.log("正常にregions.tsをパースしました:", regions);
    // 例: regions[0].name のようにプロパティにアクセスできます。

} catch (e) {
    // エラーハンドリング
    console.error("regions.tsのパースに失敗しました。ファイルが有効な配列を含んでいるか確認してください。", e);
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
