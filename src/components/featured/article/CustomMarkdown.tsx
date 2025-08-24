import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toString } from "mdast-util-to-string";
import { Post } from "@/types/types";
import { LinkCard } from "@/components/elements/LinkCard";

export interface createCustomHeadingProps {
  level: number; // 見出しのレベル (2ならh2, 3ならh3)
}

export interface CustomImgProps {
  src: string;
  alt: string;
}

export interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  allPosts: Post[];
  currentPostType: string;
}

/**
 * 指定されたレベルの見出しコンポーネントを生成する関数
 * @param {number} level - 見出しレベル (2ならh2, 3ならh3)
 * @returns {function({node, children}): JSX.Element} - ReactMarkdownのcomponentsプロパティに渡すためのコンポーネント
 */
export const createCustomHeading = ({ level }: createCustomHeadingProps) => {
  const Tag = `h${level}`;

  interface CustomHeadingProps {
    node: unknown; // Use 'unknown' to avoid 'any' and be type-safe
    children: React.ReactNode;
  }

  const CustomHeading = ({ node, children }: CustomHeadingProps) => {
    // ノードのテキストコンテンツからidを生成
    const text = toString(node).trim();
    const id = text.replace(/\s+/g, "-");
    return React.createElement(Tag, { id }, children);
  };

  // React DevToolsで表示されるコンポーネント名を指定
  CustomHeading.displayName = `CustomH${level}`;

  return CustomHeading;
};

export const CustomImg = ({ src, alt }: CustomImgProps) => {
  return (
    <Image src={src} alt={alt} layout="responsive" width={700} height={400} />
  );
};

/**
 * @param {object} props
 * @param {string} props.href - リンク先のURL
 * @param {React.ReactNode} props.children - リンクのテキスト
 * @param {Post[]} props.allPosts - すべての投稿データの配列
 * @param {string} props.currentPostType - 現在表示している投稿のタイプ
 */
export const CustomLink = ({
  href,
  children,
  allPosts,
  currentPostType,
}: CustomLinkProps) => {
  const hrefStr = href || "";
  let linkedPost;

  // パターン1: /type/slug または ../type/slug
  const absoluteLinkMatch = hrefStr.match(/^(?:\.\.\/|\/)(\w+)\/([\w-]+)$/);
  if (absoluteLinkMatch) {
    const [, type, slug] = absoluteLinkMatch;
    linkedPost = allPosts.find((p) => p.type === type && p.slug === slug);
  }

  // パターン2: ./slug
  const relativeLinkMatch = hrefStr.match(/^\.\/([\w-]+)$/);
  if (relativeLinkMatch && !linkedPost) {
    const [, slug] = relativeLinkMatch;
    linkedPost = allPosts.find(
      (p) => p.type === currentPostType && p.slug === slug
    );
  }

  // 内部リンクで記事が見つかった場合
  if (linkedPost) {
    // 埋め込みカードとして表示
    return (
      <LinkCard
        href={`/posts/${linkedPost.slug}`}
        title={linkedPost.title}
        excerpt={linkedPost.excerpt}
        imageUrl={linkedPost.image}
        variant="standard"
      />
    );
  }

  // 外部リンクやその他のリンクの場合
  // hrefが"/"から始まる内部リンクはNext.jsのLinkコンポーネントを使用
  if (hrefStr.startsWith("/")) {
    return <Link href={hrefStr}>{children}</Link>;
  }

  // それ以外の外部リンク
  return (
    <a href={hrefStr} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

/**
 * テーブルのtheadとtbodyを子要素として受け取る
 */
interface CustomTableProps {
  children?: React.ReactNode;
}

export const CustomTable = ({ children }: CustomTableProps) => {
  return (
    // 横スクロールを実現するためのラッパーdiv
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-slate-200 p-2">
      <table className="w-full text-sm text-left text-foreground">
        {children}
      </table>
    </div>
  );
};

// テーブルの各要素にもスタイルを適用するため、関連コンポーネントも定義しておくと便利です
export const Thead = ({ children }: CustomTableProps) => (
  <thead className="text-xs text-foreground uppercase bg-background">
    {children}
  </thead>
);

export const Tbody = ({ children }: CustomTableProps) => (
  <tbody className="bg-background">{children}</tbody>
);

export const Tr = ({ children }: CustomTableProps) => (
  // 奇数行と偶数行で背景色を変える（ゼブラストライピング）
  <tr className="border-b border-slate-200 last:border-b-0 odd:bg-muted even:bg-background">
    {children}
  </tr>
);

export const Th = ({ children }: CustomTableProps) => (
  <th scope="col" className="px-6 py-3 font-bold">
    {children}
  </th>
);

export const Td = ({ children }: CustomTableProps) => (
  <td className="px-6 py-4 whitespace-nowrap">{children}</td>
);
