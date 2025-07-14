import getAllPosts from "@/lib/markdown";
import type { Metadata } from "next";
import * as Elements from '@/app/components/elements/index';
import * as Sections from '@/app/components/sections/index';
import * as Server from '@/app/components/server/index';
import type { Post } from "@/types/types";
import { getPostData } from "@/lib/getPostData";

// 動的にメタデータを生成
export async function generateMetadata(props: { params: Promise<{ slug: string }>}): Promise<Metadata> {
    const params = await props.params;
    const post = await getPostData('tourism', params.slug);

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

    // 1. カテゴリの一致度を評価（重み: 1）
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
    const post = await getPostData('tourism', params.slug);
    const relatedPosts = getAllPosts('tourism')
        .filter((p) => p.slug !== post.slug)
        // 各記事のスコアを計算し、降順でソート
        .sort((a, b) => getRelevanceScore(b, post) - getRelevanceScore(a, post));

    // post.locationから都市名の配列を生成
    const cities = post.location
        .flatMap(locationString => locationString.split(','))
        .map(part => {
            const trimmedPart = part.trim();
            return trimmedPart.includes('-') ? trimmedPart.split('-')[1] : trimmedPart;
        })
        .filter((value, index, self) => self.indexOf(value) === index); // 重複を削除

    return (
        <div className="container py-12">
            <Elements.ListLink href="/tourism">
                観光情報一覧に戻る
            </Elements.ListLink>

            <Sections.HeadsUp dates={post.dates} />

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Server.Article
                        post={post}
                    />

                    <Elements.ItineraryLink />
                    <Elements.SearchHeroSection />

                    {/* 関連する各地域の情報へのリンク */}
                    {cities.length > 0 && (
                        <div className="mt-12 space-y-8">
                            {cities.map(city => (
                                <Sections.FeaturedRegions key={city} city={city} />
                            ))}
                        </div>
                    )}
                    
                </div>
                <div>
                    <div className="sticky top-24 space-y-8">
                        <div className="hidden md:block">
                            <div className="max-h-64 overflow-y-auto">
                                <Server.TableOfContents />
                            </div>
                        </div>
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 text-lg font-medium">関連する記事</h3>
                            <div className="flex flex-wrap gap-2">
                                {relatedPosts.slice(0, 3).map((relatedPost) => (
                                    <Elements.MinimumPostCard key={relatedPost.slug} post={relatedPost} />
                                ))}
                            </div>
                        </div>

                        <Sections.TagList post={post} />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourismPostPage;
