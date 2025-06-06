import WorldClockClient from "./WorldClockClient"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '世界時計と時差計算',
    description: '世界各地の現地時刻と、基準都市との時差をリアルタイムで確認できる無料ツール。旅行の計画や海外の友人との連絡に便利です。',
    openGraph: {
        title: '世界時計と時差計算',
        description: '世界各地の現地時刻と、基準都市との時差をリアルタイムで確認できる無料ツール。旅行の計画や海外の友人との連絡に便利です。',
    },
    twitter: {
        title: '世界時計と時差計算',
        description: '世界各地の現地時刻と、基準都市との時差をリアルタイムで確認できる無料ツール。旅行の計画や海外の友人との連絡に便利です。',
    },
}

const WorldClockPage = () => {
    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">世界の時刻と時差</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    世界各地の現地時刻をリアルタイムで確認できます。基準となる都市を選択し、各都市との時差を計算しましょう。
                </p>
            </div>
            <WorldClockClient />
        </div>
    );
};

export default WorldClockPage;
