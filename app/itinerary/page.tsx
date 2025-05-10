import * as Sections from '@/app/components/sections/index';

const ItineraryPage = () => {
    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">旅程＆費用レポート</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">日本各地の観光スポット、グルメ、宿泊施設、交通情報など、旅行計画に役立つ情報をお届けします。</p>
            </div>

            {/* Itinerary */}
            <Sections.Posts type='itinerary' tabListClassName="hidden" />

        </div>
    )
}

export default ItineraryPage;
