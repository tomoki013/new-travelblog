import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import getAllPosts, { getPostBySlug } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as Elements from '@/app/components/elements/index';
import * as Sections from '@/app/components/sections/index';
import { members } from "@/data/member";
import type { Post } from "@/types/types";

async function getPostData(slug: string) {
    const post = await getPostBySlug('tourism', slug);
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

// 関連度を計算する関数を定義
const getRelevanceScore = (targetPost: Post, currentPost: Post): number => {
    let score = 0;

    // 1. カテゴリの一致度を評価（重み: 2）
    const commonCategories = targetPost.category.filter(cat => currentPost.category.includes(cat));
    score += commonCategories.length * 1;

    // 2. ロケーションの一致度を詳細に評価
    const currentLocations = currentPost.location.map(l => l.split('-')); // 例: [['スペイン', 'マドリード']]
    const targetLocations = targetPost.location.map(l => l.split('-')); // 例: [['スペイン', 'トレド']]

    currentLocations.forEach(currentLoc => {
        const currentCountry = currentLoc[0];
        const currentCity = currentLoc[1];

        targetLocations.forEach(targetLoc => {
            const targetCountry = targetLoc[0];
            const targetCity = targetLoc[1];

            // 国が一致する場合、スコアを加算（重み: 3）
            if (currentCountry && targetCountry && currentCountry === targetCountry) {
                score += 3;

                // さらに都市も一致する場合、追加でスコアを加算（重み: 5）
                if (currentCity && targetCity && currentCity === targetCity) {
                    score += 5; // 同じ都市の関連性をより高く評価
                }
            }
        });
    });

    return score;
};

const TourismPostPage = async (props: { params: Promise<{ slug: string }>}) => {
    const params = await props.params;
    const post = await getPostBySlug('tourism', params.slug)
    const relatedPosts = getAllPosts('tourism')
        .filter((p) => p.slug !== post.slug)
        // 各記事のスコアを計算し、降順でソート
        .sort((a, b) => getRelevanceScore(b, post) - getRelevanceScore(a, post));
    console.log('Related Posts:', relatedPosts);
    console.log('score:', relatedPosts.map(p => getRelevanceScore(p, post)));

    const author = members.find((member) => member.name === post.author) || { name: "ともきちの旅行日記", role: "", image: "/favicon.ico", description: "" };

    if (!post) {
        notFound()
    }

    return (
        <div className="container py-12">
            <Elements.ListLink href="/tourism">
                観光情報一覧に戻る
            </Elements.ListLink>

            <Sections.HeadsUp dates={post.dates} />

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Sections.Article
                        post={post}
                        author={author}
                    />
                    <Elements.ItineraryLink />
                    <Sections.SearchHeroSection />
                </div>
                <div>
                    <div className="sticky top-24 space-y-8">
                        <div className="hidden md:block">
                            <div className="max-h-64 overflow-y-auto">
                                <Sections.TableOfContents />
                            </div>
                        </div>
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 text-lg font-medium">関連する記事</h3>
                            <div className="space-y-4">
                                {relatedPosts.slice(0, 3).map((relatedPost) => (
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
                                                <Link href={`/tourism/${relatedPost.slug}`} className="hover:underline">
                                                    {relatedPost.title}
                                                </Link>
                                            </h4>
                                            <p className="text-xs text-muted-foreground">{relatedPost.dates.join("～")}</p>
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

export default TourismPostPage;
