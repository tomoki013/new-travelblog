import * as Elements from '@/app/components/elements/index';
import * as Sections from '@/app/components/sections/index';
import { Metadata } from 'next';
import getAllPosts from '@/lib/markdown';

export const metadata: Metadata = {
    title: '旅程＆費用レポート–日本各地の観光・グルメ・宿泊・交通情報',
    description: 'ともきちの旅行日記の「旅程＆費用レポート」では、日本各地の観光スポット、グルメ、宿泊施設、交通手段など、旅行計画に役立つ情報を詳しく紹介しています。',
    openGraph: {
        title: '旅程＆費用レポート–日本各地の観光・グルメ・宿泊・交通情報',
        description: 'ともきちの旅行日記の「旅程＆費用レポート」では、日本各地の観光スポット、グルメ、宿泊施設、交通手段など、旅行計画に役立つ情報を詳しく紹介しています。',
    },
    twitter: {
        title: '旅程＆費用レポート–日本各地の観光・グルメ・宿泊・交通情報',
        description: 'ともきちの旅行日記の「旅程＆費用レポート」では、日本各地の観光スポット、グルメ、宿泊施設、交通手段など、旅行計画に役立つ情報を詳しく紹介しています。',
    },
};

const ItineraryPage = () => {
    const itineraryPosts = getAllPosts('itinerary');

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">旅程＆費用レポート</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    日本各地の観光スポット、グルメ、宿泊施設、交通情報など、旅行計画に役立つ情報をお届けします。
                </p>
            </div>
            
            <Elements.Popup
                buttonType='section'
                triggerTitle="旅の概要をまとめてチェック"
                triggerDescription="クリックして全ての旅程と費用の概要をモーダルで確認できます。"
                dialogTitle="旅の概要"
                dialogDescription="左右の矢印で他の旅程に切り替えられます。"
            >
                <Elements.ListForPopup items={itineraryPosts} />
            </Elements.Popup>

            <Sections.Posts
                initialPosts={itineraryPosts}
                postFilterType="itinerary"
                showBudgetFilter={true}
                tabsGridColsClass="sm:grid-cols-2 md:grid-cols-4"
                postCardType={4}
            />
        </div>
    );
};

export default ItineraryPage;
