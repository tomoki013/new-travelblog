import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-select";
import { ArrowLeft, ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as Sections from "@/app/components/sections/index";
import { Post } from "@/lib/types";

interface Author {
    name: string;
    role: string;
    description: string;
    image: string;
}

interface ArticleProps {
    post: Post;
    author: Author;
    prevPost?: { slug: string; title: string } | null;
    nextPost?: { slug: string; title: string } | null;
    navHidden?: string;
}

const Article = ({ post, author, prevPost = null, nextPost = null, navHidden }: ArticleProps) => {
    return (
        <div className="lg:col-span-2">
            <article>
                <div className="flex justify-between">
                    {prevPost && (
                        <Link href={`/diary/${prevPost.slug}`} className="flex items-center text-sm font-medium hover:underline">
                            <ArrowLeft className="ml-1 h-4 w-4" />
                            {prevPost.title}
                        </Link>
                    )}
                    {nextPost && (
                        <Link href={`/diary/${nextPost.slug}`} className="flex items-center text-sm font-medium hover:underline">
                            {nextPost.title}
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    )}
                </div>
                <div className="my-6">
                    <Badge className="mb-3">{post.category}</Badge>
                    <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {post.dates.join("～")}
                        </div>
                        <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {post.location}
                        </div>
                    </div>
                </div>
                <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>

                <div className={`" md:hidden mb-4" ${navHidden}`}>
                    <div className="max-h-64 overflow-y-auto">
                        <Sections.TableOfContents />
                    </div>
                </div>

                <div className="prose prose-lg max-w-none dark:prose-invert">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h2: ({ children }) => {
                                const text = String(children).trim(); // 修正: trimで余計な空白を削除
                                const id = text.replace(/\s+/g, "-"); // 空白をハイフンに変換
                                return <h2 id={id}>{children}</h2>;
                            },
                            h3: ({ children }) => {
                                const text = String(children).trim(); // 修正: trimで余計な空白を削除
                                const id = text.replace(/\s+/g, "-"); // 空白をハイフンに変換
                                return <h3 id={id}>{children}</h3>;
                            },
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">
                            #{tag}
                        </Badge>
                    ))}
                </div>
                <div className="flex justify-between mt-8">
                    {prevPost && (
                        <Link href={`/diary/${prevPost.slug}`} className="flex items-center text-sm font-medium hover:underline">
                            <ArrowLeft className="ml-1 h-4 w-4" />
                            {prevPost.title}
                        </Link>
                    )}
                    {nextPost && (
                        <Link href={`/diary/${nextPost.slug}`} className="flex items-center text-sm font-medium hover:underline">
                            {nextPost.title}
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    )}
                </div>
                <Separator className="my-8" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center border p-2 rounded-lg bg-card">
                        <div className="relative mr-4 h-10 w-10 overflow-hidden rounded-full">
                            <Image
                                src={author.image}
                                alt={author.name}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{author.name}</p>
                            <p className="text-xs text-muted-foreground">{author.role}</p>
                            <p className="text-xs font-medium">{author.description}</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Article;
