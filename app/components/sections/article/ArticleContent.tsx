import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleContentProps {
    content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => (
    <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h2: ({ children }) => {
                    const text = String(children).trim();
                    const id = text.replace(/\s+/g, "-");
                    return <h2 id={id}>{children}</h2>;
                },
                h3: ({ children }) => {
                    const text = String(children).trim();
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
