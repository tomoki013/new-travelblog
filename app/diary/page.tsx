import * as Sections from '@/app/components/sections/index';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ともきちの旅行日記 | 旅行日記-国内外の旅の記録と体験",
    description: "ともきちの旅行日記では、日本各地や海外の旅行体験を、実際のレポートや魅力的な写真とともにご紹介。美しい風景、文化体験、グルメ情報など、旅のエッセンスを余すことなくお届けします。",
};

const DiaryPage = () => {
    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">旅行日記</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">日本国内や世界各地を旅した記録と体験をお届けします。美しい風景、文化体験、グルメ情報など、旅の魅力を発見してください。</p>
            </div>

            {/* Diary Posts */}
            <Sections.Posts type="diary" />

        </div>
    );
}

export default DiaryPage;
