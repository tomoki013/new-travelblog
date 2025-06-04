import Link from 'next/link';
import * as Sections from '@/app/components/sections/index';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "旅行先ルーレット–迷ったら運命の旅先を！",
    description: "ともきちの旅行日記「旅行先ルーレット」では、迷った時に役立つルーレット機能で、運命の旅行先を選択。選ばれた場所に関連する観光情報や旅行記記事もチェックでき、次の旅のインスピレーションに最適なコンテンツです。",
    openGraph: {
        title: "旅行先ルーレット–迷ったら運命の旅先を！",
        description: "ともきちの旅行日記「旅行先ルーレット」では、迷った時に役立つルーレット機能で、運命の旅行先を選択。選ばれた場所に関連する観光情報や旅行記記事もチェックでき、次の旅のインスピレーションに最適なコンテンツです。",
    },
    twitter: {
        title: "旅行先ルーレット–迷ったら運命の旅先を！",
        description: "ともきちの旅行日記「旅行先ルーレット」では、迷った時に役立つルーレット機能で、運命の旅行先を選択。選ばれた場所に関連する観光情報や旅行記記事もチェックでき、次の旅のインスピレーションに最適なコンテンツです。",
    }
};

const RoulettePage = () => {
    return (
        <div className="container py-12">
            <div className='m-8 rounded-md bg-yellow-200 flex justify-center items-center border border-muted-foreground p-2 text-black'>
                <p className='mx-auto max-w-2xl text-muted-foreground'>
                    海外旅行に出発する前には、
                    <Link className='underline text-blue-500 hover:text-blue-600' href="https://www.anzen.mofa.go.jp/">
                        外務省の海外安全ホームページ
                    </Link>
                    を必ず確認し、最新の渡航情報を把握してください。現地の治安状況や危険情報を確認し、安全対策を講じることが重要です。また、旅行保険の加入や予防接種の確認も忘れずに行いましょう。安全第一で、万全の準備を整えてください。
                </p>
            </div>
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">旅行先ルーレット</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    行き先に迷ったら、ルーレットを回して運命の旅行先を見つけましょう！
                    選ばれた場所に関連する情報や記事もご紹介します。
                </p>
            </div>

            {/* ルーレット */}
            <Sections.Roulette />
        </div>
    );
}

export default RoulettePage;
