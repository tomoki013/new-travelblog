import { Badge } from "@/components/ui/badge"
import { getPostBySlug } from "@/lib/markdown";
import { Separator } from "@radix-ui/react-select";
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as Sections from "@/app/components/sections/index";
import { members } from "@/lib/member";

const Article = async (props: { params: Promise<{ slug: string }>}) => {
    const params = await props.params;
    const post = await getPostBySlug('tourism', params.slug)
    const author = members.find((member) => member.name === post.author);

    return (
        <div className="lg:col-span-2">
            <article>
                <div className="mb-6">
                    <Badge className="mb-3">{post.category}</Badge>
                    <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {post.date}
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
                <div className="md:hidden mb-4">
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
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                            #{tag}
                        </Badge>
                    ))}
                </div>
                <Separator className="my-8" />
            
                <div className="flex items-center justify-between">
                    <div className="flex items-center border p-2 rounded-lg bg-card">
                        <div className="relative mr-4 h-10 w-10 overflow-hidden rounded-full">
                            <Image
                                src={author?.image || '/favicon.ico'}
                                alt={author?.name || 'ともきちの旅行日記'}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{author?.name || 'ともきちの旅行日記'}</p>
                            <p className="text-xs text-muted-foreground">{author?.role || ''}</p>
                            <p className="text-xs font-medium">{author?.description || ''}</p>
                        </div>
                    </div>
                    {/* <div className="flex space-x-2">
                        <Button variant='outline' size='icon'>
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">シェア</span>
                        </Button>
                        <Button variant='outline' size='icon'>
                            <Bookmark className="h-4 w-4" />
                            <span className="sr-only">保存</span>
                        </Button>
                    </div> */}
                </div>
            </article>
        </div>
    )
}

export default Article;
