const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(process.cwd(), "posts");
const cachePath = path.join(process.cwd(), ".posts.cache.json");

/**
 * travel-diary.config.json を読み込み、
 * スキャン対象のサブディレクトリ名の配列を取得する (非同期版)
 */
async function getPostSubdirectories() {
  const allItems = await fs.readdir(postsDirectory); // "travel-diary.config.json" という名前のファイルのみを対象にする

  const configFiles = allItems.filter(
    (name) => name === "travel-diary.config.json"
  );

  const directories = new Set();

  for (const configFile of configFiles) {
    const configPath = path.join(postsDirectory, configFile);

    let stats;
    try {
      // .config.jsonがファイルであることを確認
      stats = await fs.stat(configPath);
    } catch (e) {
      // ファイルが存在しない場合はスキップ
      continue;
    }

    if (stats.isDirectory()) continue;

    const fileContents = await fs.readFile(configPath, "utf8");
    try {
      const config = JSON.parse(fileContents);
      if (Array.isArray(config.directories)) {
        config.directories.forEach((dir) => directories.add(dir));
      }
    } catch (e) {
      console.error(`Error parsing ${configFile}:`, e);
    }
  } // 例: ["travel-posts"]
  return Array.from(directories);
}

/**
 * configで指定されたサブディレクトリ内の記事コンテンツをキャッシュする
 */
async function generatePostsCache() {
  console.log("Generating posts cache...");
  try {
    // 1. 設定ファイルから読み込むべきサブディレクトリのリストを取得
    const subdirectories = await getPostSubdirectories(); // 例: ["travel-posts"]
    const postsCache = {};

    // 2. 各サブディレクトリをループ
    for (const dir of subdirectories) {
      const currentPostDir = path.join(postsDirectory, dir);

      // 3. ディレクトリが存在するかチェック (非同期)
      try {
        const stats = await fs.stat(currentPostDir);
        if (!stats.isDirectory()) {
          console.warn(
            `Path ${currentPostDir} specified in config is not a directory. Skipping.`
          );
          continue;
        }
      } catch (e) {
        // ディレクトリが存在しない場合
        console.warn(
          `Directory ${currentPostDir} specified in config does not exist. Skipping.`
        );
        continue;
      }

      // 4. サブディレクトリ内のファイル一覧を取得
      const fileNames = await fs.readdir(currentPostDir);

      for (const fileName of fileNames) {
        // 5. .md または .mdx ファイルのみを対象
        if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) {
          continue;
        }

        // 6. slugを生成 (拡張子を除去)
        const slug = fileName.replace(/\.(md|mdx)$/, "").toLowerCase();
        const fullPath = path.join(currentPostDir, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8"); // 7. フロントマターを除いた本文(content)のみをキャッシュ

        const { content } = matter(fileContents);
        postsCache[slug] = content;
      }
    } // サブディレクトリのループ終了

    // 8. キャッシュファイル書き込み
    await fs.writeFile(cachePath, JSON.stringify(postsCache));
    console.log("✅ Successfully generated posts cache at .posts.cache.json");
  } catch (error) {
    console.error("Error generating posts cache:", error);
    process.exit(1);
  }
}

generatePostsCache();
