import * as Sections from '@/app/components/sections/index';
import type { Metadata } from "next";
import getAllPosts from '@/lib/markdown';

export const metadata: Metadata = {
    title: "観光情報– 国内外のおすすめ旅行スポット＆ガイド",
    description: "ともきちの旅行日記「観光情報」では、日本各地や海外の人気観光スポット、グルメ、宿泊施設、交通情報を分かりやすくご紹介。実際の旅行記レポートも満載で、次の旅の計画に役立つ最新情報をお届けします。",
    openGraph: {
        title: "観光情報– 国内外のおすすめ旅行スポット＆ガイド",
        description: "ともきちの旅行日記「観光情報」では、日本各地や海外の人気観光スポット、グルメ、宿泊施設、交通情報を分かりやすくご紹介。実際の旅行記レポートも満載で、次の旅の計画に役立つ最新情報をお届けします。",
    },
    twitter: {
        title: "観光情報– 国内外のおすすめ旅行スポット＆ガイド",
        description: "ともきちの旅行日記「観光情報」では、日本各地や海外の人気観光スポット、グルメ、宿泊施設、交通情報を分かりやすくご紹介。実際の旅行記レポートも満載で、次の旅の計画に役立つ最新情報をお届けします。",
    },
};

const TourismPage = () => {
    const tourismPosts = getAllPosts('tourism');

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">観光情報</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    世界各地の観光スポット、グルメ、宿泊施設、交通情報など、旅行計画に役立つ情報をお届けします。
                </p>
            </div>

            <Sections.FeaturedRegions />

            <Sections.Posts
                initialPosts={tourismPosts}
                postFilterType="tourism"
                tabsGridColsClass="sm:grid-cols-2 md:grid-cols-7"
            />
        </div>
    );
};

export default TourismPage;
