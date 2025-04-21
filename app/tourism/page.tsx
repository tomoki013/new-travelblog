import * as Sections from '@/app/components/sections/index';
import * as Elements from '@/app/components/elements/index';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ともきちの旅行日記 | 観光情報– 国内外のおすすめ旅行スポット＆ガイド",
    description: "ともきちの旅行日記「観光情報」では、日本各地や海外の人気観光スポット、グルメ、宿泊施設、交通情報を分かりやすくご紹介。実際の旅行記レポートも満載で、次の旅の計画に役立つ最新情報をお届けします。",
};

const TourismPage = () => {
    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">観光情報</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">日本各地の観光スポット、グルメ、宿泊施設、交通情報など、旅行計画に役立つ情報をお届けします。</p>
            </div>

            {/* Featured Regions */}
            <Sections.FeaturedRegions />

            {/* Search Box */}
            <Elements.SearchBox type="tourism" />

            {/* Tourism Information */}
            <Sections.Posts type="tourism" />

            {/* Travel Tips */}
            <section className="mt-16 rounded-xl bg-muted p-8">
                <h2 className="mb-6 text-2xl font-bold">旅行のヒント</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-background p-6 shadow-sm">
                        <h3 className="mb-3 text-lg font-bold">ベストシーズン</h3>
                        <p className="text-sm text-muted-foreground">日本は四季がはっきりとしており、季節ごとに異なる魅力があります。桜の季節（3月下旬~4月）と紅葉の季節（10月下旬~11月）は特に人気です。</p>
                    </div>
                    <div className="rounded-lg bg-background p-6 shadow-sm">
                        <h3 className="mb-3 text-lg font-bold">交通手段</h3>
                        <p className="text-sm text-muted-foreground">日本の公共交通機関は非常に発達しています。長距離移動には新幹線、都市内の移動には地下鉄やバスが便利です。JR PASSは外国人旅行者におすすめです。</p>
                    </div>
                    <div className="rounded-lg bg-background p-6 shadow-sm">
                        <h3 className="mb-3 text-lg font-bold">旅行予算</h3>
                        <p className="text-sm text-muted-foreground">日本旅行の予算は、宿泊施設や食事のグレードによって大きく変わります。一般的に、1日当たり10,000円~30,000円程度を見込んでおくといいでしょう。</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TourismPage;
