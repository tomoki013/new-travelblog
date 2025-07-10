import { Badge } from "@/components/ui/badge";
import getAllPosts from "@/lib/markdown";
import * as Elements from '@/app/components/elements/index';
import * as Server from '@/app/components/server/index';
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { getPostData } from "@/lib/getPostData";

// 動的にメタデータを生成
export async function generateMetadata(props: { params: Promise<{ slug: string }>}): Promise<Metadata> {
    const params = await props.params;
    const post = await getPostData('diary', params.slug);

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
    const post = await getPostData('diary', params.slug);

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
                    <Server.Article
                        post={post}
                    />
                    <Elements.ItineraryLink />
                    <Elements.SearchHeroSection />
                </div>
                <div>
                    <div className="sticky top-24 space-y-8">
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 text-lg font-medium">最新の記事</h3>
                            <div className="space-y-4">
                                {getAllPosts('diary').slice(0, 3).map((relatedPost) => (
                                    <Elements.MinimumPostCard key={relatedPost.slug} post={relatedPost} />
                                ))}
                            </div>
                        </div>
                        <div className={cn(
                            "rounded-lg border bg-card p-6",
                            { "hidden": !itineraryPost }
                        )}>
                            <h3 className="mb-4 text-lg font-medium">旅程＆費用レポート</h3>
                            <div className="space-y-4">
                                {itineraryPost ? (
                                    <Elements.MinimumPostCard post={itineraryPost} />
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        この旅行に関連する旅程や費用レポートはありません。
                                    </p>
                                )}
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
