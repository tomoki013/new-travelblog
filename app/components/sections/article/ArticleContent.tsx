// app/components/sections/article/ArticleContent.tsx

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toString } from 'mdast-util-to-string';
import { Post } from '@/types/types';
import * as Elements from '@/app/components/elements/index';

interface ArticleContentProps {
    content: string;
    allPosts: Post[];
    currentPostType: Post['type']; // 現在の記事のタイプを受け取る
}

const ArticleContent = ({ content, allPosts, currentPostType }: ArticleContentProps) => (
    <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h2: ({ node, children }) => {
                    const text = toString(node).trim();
                    const id = text.replace(/\s+/g, "-");
                    return <h2 id={id}>{children}</h2>;
                },
                h3: ({ node, children }) => {
                    const text = toString(node).trim();
                    const id = text.replace(/\s+/g, "-");
                    return <h3 id={id}>{children}</h3>;
                },
                a: ({ ...props }) => {
                    const href = props.href || '';
                    let linkedPost: Post | undefined;

                    // パターン1: /type/slug または ../type/slug 形式のリンクをチェック
                    const absoluteLinkMatch = href.match(/^(?:\.\.\/|\/)(\w+)\/([\w-]+)$/);
                    if (absoluteLinkMatch) {
                        const [, type, slug] = absoluteLinkMatch;
                        linkedPost = allPosts.find(p => p.type === type && p.slug === slug);
                    }

                    // パターン2: ./slug 形式のリンクをチェック
                    const relativeLinkMatch = href.match(/^\.\/([\w-]+)$/);
                    if (relativeLinkMatch) {
                        const [, slug] = relativeLinkMatch;
                        // 現在の記事と同じタイプ内でスラグを検索
                        linkedPost = allPosts.find(p => p.type === currentPostType && p.slug === slug);
                    }

                    // リンク先の記事が見つかった場合
                    if (linkedPost) {
                        return <Elements.EmbeddedPostCard post={linkedPost} />;
                    }
                    
                    // 外部リンクやその他のリンクは通常通り表示
                    return <a href={href} target="_blank" rel="noopener noreferrer">{props.children}</a>;
                },
            }}
        >
            {content}
        </ReactMarkdown>
    </div>
);

export default ArticleContent;
