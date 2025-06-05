import Image from "next/image";
import Link from "next/link";

interface Author {
    name: string;
    role: string;
    description: string;
    image: string;
}

interface ArticleAuthorProps {
    author: Author;
}

const ArticleAuthor = ({ author }: ArticleAuthorProps) => (
    <div className="flex items-center justify-between">
        {author.name !== 'ともきちの旅行日記' ? (
            <Link href={`/personal/${encodeURIComponent(author.name)}`} className="flex items-center border p-2 rounded-lg bg-card">
                <div className="relative mr-4 h-10 w-10 overflow-hidden rounded-full">
                    <Image src={author.image} alt={author.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                    <p className="text-sm font-medium">{author.name}</p>
                    <p className="text-xs text-muted-foreground">{author.role}</p>
                    <p className="text-xs font-medium">{author.description}</p>
                </div>
            </Link>
        ) : (
            <p className="flex items-center border p-2 rounded-lg bg-card">
                <div className="relative mr-4 h-10 w-10 overflow-hidden rounded-full">
                    <Image src={'favicon.ico'} alt={'ともきちの旅行日記'} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                    <p className="text-sm font-medium">ともきちの旅行日記</p>
                </div>
            </p>
        )}
    </div>
);

export default ArticleAuthor;
