import WorldClockClient from "./WorldClockClient"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '世界時計',
    description: '世界各地の現地時刻をリアルタイムで確認できる無料ツール。旅行の計画や海外の友人との連絡に便利にお使いください。',
    openGraph: {
        title: '世界時計',
        description: '世界各地の現地時刻をリアルタイムで確認できる無料ツール。旅行の計画や海外の友人との連絡に便利にお使いください。',
    },
    twitter: {
        title: '世界時計',
        description: '日本と世世界各地の現地時刻をリアルタイムで確認できる無料ツール。旅行の計画や海外の友人との連絡に便利にお使いください。界の美しい風景、文化、食べ物を通じて、新しい旅の発見をお届けする旅行ブログ。',
    },
}

const WorldClockPage = () => {
    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">世界の時刻</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    世界各地の現地時刻をリアルタイムで確認できます。旅行の計画や、海外の友人との連絡に便利にお使いください。
                </p>
            </div>
            <WorldClockClient />
        </div>
    );
};

export default WorldClockPage;
