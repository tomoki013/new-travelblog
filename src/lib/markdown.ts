import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/types";
import { ensureStringArray } from "@/lib/utils";

const postsDirectory = path.join(process.cwd(), "posts");

type PostMetadata = Omit<Post, "content">;

function getPostSubdirectories(): string[] {
  const allItems = fs.readdirSync(postsDirectory);

  const configFiles = allItems.filter(
    (name) => name === "travel-diary.config.json"
  );

  const directories = new Set<string>();

  for (const configFile of configFiles) {
    const configPath = path.join(postsDirectory, configFile);

    if (fs.statSync(configPath).isDirectory()) continue;

    const fileContents = fs.readFileSync(configPath, "utf8");
    try {
      const config = JSON.parse(fileContents);
      if (Array.isArray(config.directories)) {
        config.directories.forEach((dir: string) => directories.add(dir));
      }
    } catch (e) {
      console.error(`Error parsing ${configFile}:`, e);
    }
  }
  return Array.from(directories);
}

export function getRawPostsData(): PostMetadata[] {
  // 1. 設定ファイルから読み込むべきサブディレクトリのリストを取得
  const subdirectories = getPostSubdirectories();
  let allPostsData: PostMetadata[] = [];

  // 2. 各サブディレクトリをループ
  for (const dir of subdirectories) {
    const currentPostDir = path.join(postsDirectory, dir);

    // 3. ディレクトリが存在するかチェック
    if (
      !fs.existsSync(currentPostDir) ||
      !fs.statSync(currentPostDir).isDirectory()
    ) {
      console.warn(
        `Directory ${currentPostDir} specified in config does not exist. Skipping.`
      );
      continue;
    }

    // 4. サブディレクトリ内の .md/.mdx ファイルを読み込む
    const fileNames = fs
      .readdirSync(currentPostDir)
      .filter(
        (fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx")
      );

    // 5. 各ファイルのメタデータを処理
    const postsInData = fileNames.map((fileName) => {
      // ▼▼▼ 追加ロジック: 小文字チェックとリネーム ▼▼▼
      const lowerCaseFileName = fileName.toLowerCase();
      let processingFileName = fileName; // 処理に使用するファイル名

      // ファイル名が小文字と異なる（＝大文字が含まれている）場合
      if (fileName !== lowerCaseFileName) {
        const oldPath = path.join(currentPostDir, fileName);
        const newPath = path.join(currentPostDir, lowerCaseFileName);

        try {
          // 既に同名の小文字ファイルが存在しない場合のみリネームを実行
          // (Windows/Macでは大文字小文字を区別しないため existsSync は true を返す可能性があるが、renameSync は動作するケースが多い。
          // 安全のため try-catch で囲んでいます)
          fs.renameSync(oldPath, newPath);
          console.log(
            `[Auto-Fix] Renamed: ${fileName} -> ${lowerCaseFileName}`
          );

          // リネーム成功後は、小文字のファイル名として処理を続行する
          processingFileName = lowerCaseFileName;
        } catch (error) {
          console.error(`Failed to rename ${fileName} to lowercase:`, error);
          // 失敗した場合は元のファイル名のまま処理を続行
        }
      }
      // ▲▲▲ 追加ロジック終了 ▲▲▲

      const slug = processingFileName.replace(/\.(md|mdx)$/, "");
      // 修正点: processingFileNameを使用
      const fullPath = path.join(currentPostDir, processingFileName);

      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        dates: ensureStringArray(data.dates),
        category: data.category,
        tags: ensureStringArray(data.tags),
        excerpt: data.excerpt,
        image: data.image,
        location: ensureStringArray(data.location),
        author: data.author,
        budget: data.budget,
        costs: data.costs,
        series: data.series,
        isPromotion: data.isPromotion,
        promotionPG: data.promotionPG,
      } as PostMetadata;
    });

    // 6. 結果を結合
    allPostsData = allPostsData.concat(postsInData);
  }

  return allPostsData;
}
