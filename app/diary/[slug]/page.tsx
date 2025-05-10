import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import getAllPosts, { getPostBySlug } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
// import type { Metadata } from "next";
import * as Elements from '@/app/components/elements/index';
import { members } from "@/lib/member";
import Article from '@/app/components/sections/article/Article';

export async function generateStaticParams() {
    const posts = getAllPosts('diary')
    return posts.map((posts) => ({
        slug: posts.slug,
    }))
}

// 動的にメタデータを生成
// export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//     const params = await props.params;
//     const post = await getPostBySlug('tourism', params.slug);

//     if (!post) {
//         notFound();
//     }

//     return {
//         title: post.title,
//         description: post.excerpt,
//     };
// }

const DiaryPostPage = async (props: { params: Promise<{ slug: string }>}) => {
    const params = await props.params;
    const post = await getPostBySlug('diary', params.slug);
    const allPosts = getAllPosts('diary');

    const author = members.find((member) => member.name === post.author) || { name: "ともきちの旅行日記", role: "", image: "/favicon.ico", description: "" };

    if (!post) {
        notFound();
    }

    const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
    const prevPost = allPosts[currentIndex - 1] || null;
    const nextPost = allPosts[currentIndex + 1] || null;

    return (
        <div className="container py-12">
            <Elements.ListLink href="/diary">
                旅行日記一覧に戻る
            </Elements.ListLink>

            <div className="grid gap-10 lg:grid-cols-3">
                <Article
                    post={post}
                    author={author}
                    prevPost={prevPost}
                    nextPost={nextPost}
                />
                <div>
                    <div className="sticky top-24 space-y-8">
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
