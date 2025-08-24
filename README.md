# ともきちの旅行日記 - A Next.js Travel Blog

[![Deploy with Netlify](https://tomokichidiary.netlify.app)]

**ともきちの旅行日記**は、「旅に出るワクワク感」をコンセプトにした、モダンな技術で構築された個人旅行ブログです。インタラクティブな世界地図やテーマ別のシリーズ記事を通じて、読者の冒険心を刺激するユニークな視覚体験を提供します。

---

## ✨ 主な特徴

このプロジェクトは、多機能でメンテナンス性の高いブログサイトを実現するための様々な機能を備えています。

<!-- * **インタラクティブな世界地図**: `D3.js`を利用したクリック可能な世界地図から、直感的に旅先を探せます。 -->

- **動的なコンテンツハブ**: 国・地域別の「Destinationページ」や、テーマ別の「Seriesページ」を自動生成し、関連コンテンツをまとめて表示します。
- **Markdownベースのコンテンツ**: 記事はすべてMarkdownで管理されており、`gray-matter`によるフロントマターで豊富なメタデータを扱えます。
- **カスタムMarkdownコンポーネント**: 内部リンクカードや、デザインされたテーブルなど、Markdownの表現力を拡張するカスタムコンポーネントを実装しています。
- **豊富なアニメーション**: `Framer Motion`による心地よいページ遷移やローディングアニメーションが、サイト体験を向上させます。
- **ユーザー参加型機能**: 読者が記事のテーマをリクエストできる専用ページを設置し、「ユーザーと共に作り上げるメディア」を目指します。
- **レスポンシブデザイン**: PC、タブレット、スマートフォンなど、あらゆるデバイスで最適化された表示を実現します。

---

## 🛠️ 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org/) (App Router)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **アニメーション**: [Framer Motion](https://www.framer.com/motion/)
<!-- * **地図描画**: [D3.js](https://d3js.org/) -->
- **Markdown処理**: [React Markdown](https://github.com/remarkjs/react-markdown), [Gray Matter](https://github.com/jonschlinkert/gray-matter)
- **デプロイメント**: [Netlify](https://netlify.com/)

---

## 🚀 導入方法

このプロジェクトをローカル環境でセットアップする手順は以下の通りです。

1. **リポジトリをクローン**:

```bash
git clone [https://github.com/tomoki013/new-travelblog.git](https://github.com/tomoki013/new-travelblog.git)
```

2. **ディレクトリを移動**:

```bash
cd new-travelblog
```

3. **依存関係をインストール**:

```bash
npm install
# or
yarn install
```

4. **開発サーバーを起動**:

```bash
npm run dev
# or
yarn dev
```

5. **ブラウザで確認**:
   ブラウザで `http://localhost:3000` を開くと、サイトが表示されます。

---

<!-- ## 📁 ディレクトリ構成

プロジェクトの主要なディレクトリ構成です。
.
├── src
│ ├── app/ # App Routerのルートとページ
│ ├── components/ # 再利用可能なUIコンポーネント
│ ├── data/ # 地域情報などの静的データ
│ ├── lib/ # 汎用的なヘルパー関数
│ └── posts/ # Markdown形式のブログ記事
├── public/ # 画像などの静的アセット
└── README.md

---

## 📝 コンテンツ管理

新しいブログ記事は、`src/posts/` ディレクトリ内にMarkdownファイル (`.md`) として追加します。
各記事ファイルは、メタデータを定義する**フロントマター**を持つ必要があります。

**例 (`example-post.md`):**

```markdown
---
title: "サンプル記事のタイトル"
publishDate: "2025-08-25"
image: "/images/posts/sample.jpg"
category: "旅行日記"
series: "sunsets"
location: ["kyoto", "osaka"]
excerpt: "この記事はサンプルです。フロントマターにはこのようにメタデータを記述します。"
---

## ここから本文

Markdown記法で自由に記事を記述できます。 -->

```

```
