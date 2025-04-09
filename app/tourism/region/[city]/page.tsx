import * as Elements from '@/app/components/elements/index';
import * as Sections from '@/app/components/sections/index';
import { regions } from "@/app/components/sections/regions/FeaturedRegions";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
    const decodedCity = await decodeURIComponent(params.city);
    const metadataData = [
        {
            city: 'パリ',
            title: 'ともきちの旅行日記｜パリ–フランスの魅力が詰まった観光情報',
            description: 'ともきちの旅行日記「パリ」ページでは、エッフェル塔、ルーブル美術館、セーヌ川クルーズなど、パリならではの人気観光スポットやグルメ情報、交通手段、宿泊施設の詳細を分かりやすくご紹介。次の旅先選びのヒントが満載です。',
        },
        {
            city: 'マドリード',
            title: 'ともきちの旅行日記｜マドリード–スペインの情熱あふれる観光情報',
            description: 'ともきちの旅行日記「マドリード」ページでは、スペインの首都マドリードならではの歴史や文化、グルメ、観光スポットなどの情報を詳しくご紹介。美術館や歴史的建造物、散策ルート、地元グルメのおすすめ情報など、次の旅先選びのヒントが満載です。',
        },
        {
            city: 'バルセロナ',
            title: 'ともきちの旅行日記｜バルセロナ–ガウディ建築と地中海の魅力',
            description: 'ともきちの旅行日記「バルセロナ」ページでは、サグラダ・ファミリアやグエル公園などのガウディ建築、美しいビーチ、豊かな食文化など、バルセロナの魅力を詳しくご紹介。次の旅先選びの参考にぜひご覧ください。',
        },
        {
            city: 'トレド',
            title: 'ともきちの旅行日記｜トレド–スペインの歴史薫る古都の魅力',
            description: 'ともきちの旅行日記「トレド」ページでは、スペインの古都トレドの魅力を詳しくご紹介。カテドラルやアルカサルなどの歴史的建造物、旧市街の散策スポット、地元のグルメ情報など、次の旅先選びに役立つ情報が満載です。',
        },
        {
            city: 'バンコク',
            title: 'ともきちの旅行日記｜バンコク–タイの魅力溢れる観光情報',
            description: 'ともきちの旅行日記「バンコク」ページでは、ワット・プラケオ、ワット・ポー、ワット・アルンなどの三大寺院をはじめ、BTSやMRTを利用した効率的な移動方法、地元グルメ、宿泊施設情報など、バンコク観光に役立つ情報を詳しくご紹介。次の旅の計画にぜひお役立てください。',
        },
        {
            city: 'デリー',
            title: 'ともきちの旅行日記｜デリー–インドの歴史と文化が息づく首都',
            description: 'ともきちの旅行日記「デリー」ページでは、インドの首都デリーの魅力を詳しくご紹介。レッドフォートやクトゥブ・ミナールなどの世界遺産、活気あふれるバザール、豊かな食文化など、デリーならではの観光スポットや体験をお届けします。次の旅先選びの参考にぜひご覧ください。',
        },
        {
            city: 'アグラ',
            title: 'ともきちの旅行日記｜アグラ–タージ・マハルと歴史的遺産の街',
            description: 'ともきちの旅行日記「アグラ」ページでは、世界遺産タージ・マハルやアグラ城塞、ファテープル・シークリーなど、ムガル帝国の栄華を今に伝えるアグラの観光スポットを詳しくご紹介。次の旅先選びの参考にぜひご覧ください。',
        },
        {
            city: 'ジャイプル',
            title: 'ともきちの旅行日記｜ジャイプール–ピンクシティの魅力と観光情報',
            description: 'ともきちの旅行日記「ジャイプール」ページでは、アンベール城、ハワー・マハル、シティ・パレスなどの歴史的建造物や、地元のグルメスポット、文化体験など、ジャイプールの魅力を詳しくご紹介。次の旅先選びの参考にぜひご覧ください。',
        },
        {
            city: 'バラナシ',
            title: 'ともきちの旅行日記｜バラナシ–ガンジス川とヒンドゥー教の聖地を巡る旅',
            description: 'ともきちの旅行日記「バラナシ」ページでは、インドの聖地バラナシの魅力を詳しくご紹介。ガンジス川沿いのガートでの沐浴風景や、ダシャーシュワメード・ガートでのガンガー・アールティー、マニカルニカー・ガートでの火葬場の様子など、バラナシならではの文化や風習をお伝えします。また、サールナートやカシー・ヴィシュワナート寺院などの観光スポット、地元のグルメ情報も掲載。次の旅先選びの参考にぜひご覧ください。',
        },
        {
            city: 'ブリュッセル',
            title: 'ともきちの旅行日記｜ブリュッセル–ベルギーの首都で味わう歴史と美食の旅',
            description: 'ともきちの旅行日記「ブリュッセル」ページでは、グランプラスや小便小僧などの歴史的名所から、アトミウムや王宮といった近代的な見どころまで、ブリュッセルの多彩な魅力を紹介。美食の都として知られるベルギー料理やチョコレート、ワッフルも堪能できます。次の旅のインスピレーションをぜひご覧ください。',
        },
    ];

    const metadata = metadataData.find(data => data.city.toLowerCase() === decodedCity.toLowerCase());

    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
        };
    }

    return {
        title: '地域情報',
        description: '指定された地域の観光情報が見つかりませんでした。',
    };
}

const RegionPage = async (props: { params: Promise<{ city: string }> }) => {
    const resolvedParams = await props.params;
    const decodedCity = decodeURIComponent(resolvedParams.city);
    const region = regions.find(region => region.city.toLowerCase() === decodedCity.toLowerCase());

    if (!region) {
        return <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">地域が見つかりません</h1>
        </div>;
    }

    return (
        <div className="container py-12">

            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">{decodedCity}観光情報</h1>
            </div>

            {/* Tourism Information */}
            <Sections.Posts type='tourism' filter='region' filterItem={decodedCity} />

            {/* Featured Regions */}
            <Sections.FeaturedRegions />

            <Elements.ListLink href="/tourism">
                観光情報一覧に戻る
            </Elements.ListLink>

        </div>
    );
}

export default RegionPage;
