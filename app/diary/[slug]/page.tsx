import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import getAllPosts, { getPostBySlug } from "@/lib/markdown";
import { Separator } from "@radix-ui/react-select";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
    const posts = getAllPosts('diary')
    return posts.map((posts) => ({
        slug: posts.slug,
    }))
}

const DiaryPostPage = async (props: { params: Promise<{ slug: string }>}) => {
    const params = await props.params;
    const post = await getPostBySlug('diary', params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="container py-12">
            <div className="mb-8">
                <Link
                    href='/diary'
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    旅行日記一覧に戻る
                </Link>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
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

                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
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
                        
                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="relative mr-4 h-10 w-10 overflow-hidden rounded-full">
                                    <Image
                                        src={post.authorImage}
                                        alt={post.author}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{post.author}</p>
                                    <p className="text-xs text-muted-foreground">旅行ブロガー</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant='outline' size='icon'>
                                    <Share2 className="h-4 w-4" />
                                    <span className="sr-only">シェア</span>
                                </Button>
                                <Button variant='outline' size='icon'>
                                    <Bookmark className="h-4 w-4" />
                                    <span className="sr-only">保存</span>
                                </Button>
                            </div>
                        </div> */}

                    </article>
                </div>

                <div>
                    <div className="sticky top-20 space-y-8">
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 text-lg font-medium">最新の記事</h3>
                            <div className="space-y-4">
                                {getAllPosts('diary').slice(0, 3).map((relatedPost) => (
                                    <div key={relatedPost.slug} className="flex gap-3">
                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                            <Image
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium">
                                                <Link href={`/diary/${relatedPost.slug}`} className="hover:underline">
                                                    {relatedPost.title}
                                                </Link>
                                            </h4>
                                            <p className="text-xs text-muted-foreground">{relatedPost.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 text-lg font-medium">人気のタグ</h3>
                            <div className="flex flex-wrap gap-2">
                                {['京都', '東京', '沖縄', 'ビーチ', '温泉', 'グルメ', '自然', '寺院', '海外', 'リゾート'].map((tag) => (
                                    <Badge key={tag} variant='secondary'>
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiaryPostPage;
