import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toString } from 'mdast-util-to-string';

interface ArticleContentProps {
    content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => (
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
            }}
        >
            {content}
        </ReactMarkdown>
    </div>
);

export default ArticleContent;
