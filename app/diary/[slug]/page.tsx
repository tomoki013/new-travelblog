import { Badge } from "@/components/ui/badge";
import getAllPosts, { getPostBySlug } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as Elements from '@/app/components/elements/index';
import * as Sections from '@/app/components/sections/index';
import { members } from "@/data/member";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

async function getPostData(slug: string) {
    const post = await getPostBySlug('diary', slug);
    if (!post) {
        notFound();
    }
    return post;
}

// 動的にメタデータを生成
export async function generateMetadata(props: { params: Promise<{ slug: string }>}): Promise<Metadata> {
    const params = await props.params;
    const slug = params.slug;
    const post = await getPostData(slug);

    return {
        title: post.title,
        description: post.excerpt,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    }
}

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

    // 日付範囲を生成する関数
    function generateDateRange(start: string, end: string): string[] {
        const result: string[] = [];
        const current = new Date(start);
        const last = new Date(end);
        while (current <= last) {
            result.push(current.toISOString().split('T')[0]);
            current.setDate(current.getDate() + 1);
        }
        return result;
    }

    const itineraryPosts = getAllPosts('itinerary');
    let itineraryPost = null;
    if (post.dates && post.dates.length > 0) {
        itineraryPost = itineraryPosts.find((itPost) => {
            if (!itPost.dates || itPost.dates.length < 2) return false;
            const range = generateDateRange(itPost.dates[0], itPost.dates[itPost.dates.length - 1]);
            return post.dates.some(date => range.includes(date));
        });
    }

    return (
        <div className="container py-12">
            <Elements.ListLink href="/diary">
                旅行日記一覧に戻る
            </Elements.ListLink>

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Sections.Article
                        post={post}
                        author={author}
                        prevPost={prevPost}
                        nextPost={nextPost}
                        navHidden="hidden"
                    />
                    <Elements.ItineraryLink />
                    <Sections.SearchHeroSection />
                </div>
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
                                            <p className="text-xs text-muted-foreground">{relatedPost.dates.join("～")}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cn(
                            "rounded-lg border bg-card p-6",
                            { "hidden": !itineraryPost }
                        )}>
                            <h3 className="mb-4 text-lg font-medium">旅程＆費用レポート</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                        <Image
                                            src={itineraryPost?.image || "/favicon.ico"}
                                            alt={itineraryPost?.title || "favicon"}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">
                                            <Link href={`/itinerary/${itineraryPost?.slug}`} className="hover:underline">
                                                {itineraryPost?.title}
                                            </Link>
                                        </h4>
                                        <p className="text-xs text-muted-foreground">{itineraryPost?.dates.join("～")}</p>
                                    </div>
                                </div>
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
