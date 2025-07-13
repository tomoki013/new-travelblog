import {
    createCustomHeadingProps,
    CustomImgProps,
    CustomLinkProps,
} from './types';
import * as Elements from '@/app/components/elements/index'; // EmbeddedPostCardを含むコンポーネント
import Image from "next/image";
import Link from 'next/link';
import React from 'react';
import { toString } from 'mdast-util-to-string';

/**
 * 指定されたレベルの見出しコンポーネントを生成する関数
 * @param {number} level - 見出しレベル (2ならh2, 3ならh3)
 * @returns {function({node, children}): JSX.Element} - ReactMarkdownのcomponentsプロパティに渡すためのコンポーネント
 */
export const createCustomHeading = ({
    level
}: createCustomHeadingProps
) => {
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

export const CustomImg = ({
    src,
    alt
}: CustomImgProps
) => {
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
    currentPostType
}: CustomLinkProps
) => {
    const hrefStr = href || '';
    let linkedPost;

    // パターン1: /type/slug または ../type/slug
    const absoluteLinkMatch = hrefStr.match(/^(?:\.\.\/|\/)(\w+)\/([\w-]+)$/);
    if (absoluteLinkMatch) {
        const [, type, slug] = absoluteLinkMatch;
        linkedPost = allPosts.find(p => p.type === type && p.slug === slug);
    }

    // パターン2: ./slug
    const relativeLinkMatch = hrefStr.match(/^\.\/([\w-]+)$/);
    if (relativeLinkMatch && !linkedPost) {
        const [, slug] = relativeLinkMatch;
        linkedPost = allPosts.find(p => p.type === currentPostType && p.slug === slug);
    }

    // 内部リンクで記事が見つかった場合
    if (linkedPost) {
        // 埋め込みカードとして表示
        return <Elements.EmbeddedPostCard post={linkedPost} />;
    }

    // 外部リンクやその他のリンクの場合
    // hrefが"/"から始まる内部リンクはNext.jsのLinkコンポーネントを使用
    if (hrefStr.startsWith('/')) {
        return <Link href={hrefStr}>{children}</Link>;
    }

    // それ以外の外部リンク
    return <a href={hrefStr} target="_blank" rel="noopener noreferrer">{children}</a>;
};
