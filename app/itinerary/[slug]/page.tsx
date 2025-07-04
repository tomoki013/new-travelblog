import * as Elements from '@/app/components/elements/index';
import * as Sections from '@/app/components/sections/index';
import { Badge } from '@/components/ui/badge';
import getAllPosts, { getPostBySlug, getAllPostTypes } from '@/lib/markdown';
import { members } from '@/data/member';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ItineraryPopupContent from '@/app/components/elements/popupContent/ItineraryPopupContent'; // インポート

// ... (getPostData, generateMetadata, generateDateRangeは変更なし)
async function getPostData(slug: string) {
    const post = await getPostBySlug('itinerary', slug);
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

const generateDateRange = (startDate: string, endDate: string): string[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateRange: string[] = [];

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        dateRange.push(date.toISOString().split('T')[0]);
    }

    return dateRange;
};


const ItineraryPostPage = async (props: { params: Promise<{ slug: string }>}) => {
    const params = await props.params;
    const post = await getPostBySlug('itinerary', params.slug);
    const allPostsForEmbedding = getAllPostTypes();

    const dateRange = generateDateRange(post.dates[0], post.dates[post.dates.length - 1]);
    const diaryPosts = getAllPosts('diary').filter((diaryPost) =>
        dateRange.some((date) => diaryPost.dates.includes(date))
    );

    const author = members.find((member) => member.name === post.author) || { name: "ともきちの旅行日記", role: "", image: "/favicon.ico", description: "" };
    
    if (!post) {
        notFound();
    }

    return (
        <div className="container py-12">
            <Elements.ListLink href="/itinerary">
                旅程＆費用レポート一覧に戻る
            </Elements.ListLink>

            <Sections.HeadsUp dates={post.dates} />
            
            {/* フローティングボタンで現在の旅程概要を表示するポップアップ */}
            <Elements.Popup
                buttonType='button'
                triggerTitle="この旅程の概要"
                triggerDescription='' // ボタンタイプなので不要
                dialogTitle="旅の概要"
            >
                <ItineraryPopupContent post={post} />
            </Elements.Popup>

            <div className="grid gap-10 lg:grid-cols-3">
                <div className='lg:col-span-2'>
                    <Sections.Article
                        post={post}
                        author={author}
                        allPosts={allPostsForEmbedding}
                    />
                    <Sections.SearchHeroSection />
                </div>
                <div>
                    <div className="sticky top-24 space-y-8">
                        <div className="hidden md:block">
                            <div className="max-h-[60vh] overflow-y-auto">
                                <Sections.TableOfContents />
                            </div>
                        </div>
                        {/* 関連日記や人気タグなどのサイドバーは変更なし */}
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 text-lg font-medium">関連する旅行日記</h3>
                            <div className="space-y-4">
                                {diaryPosts.slice(0, 3).map((diaryPost) => (
                                    <div key={diaryPost.slug} className="flex gap-3">
                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                            <Image
                                                src={diaryPost.image}
                                                alt={diaryPost.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium">
                                                <Link href={`/diary/${diaryPost.slug}`} className="hover:underline">
                                                    {diaryPost.title}
                                                </Link>
                                            </h4>
                                            <p className="text-xs text-muted-foreground">{diaryPost.dates.join("～")}</p>
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
    )
}

export default ItineraryPostPage;
