import Link from 'next/link';
import * as Sections from '@/app/components/sections/index';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ともきちの旅行日記 | Travel Diary",
    description: "日本と世界の旅行記録と観光情報",
};

const RoulettePage = () => {
    return (
        <div className="container py-12">
            <div className='container border bg-card rounded-md w-fit mx-auto p-2 mb-4'>
                <p className='mx-auto max-w-2xl text-muted-foreground'>
                    海外旅行に出発する前には、
                    <Link className='underline text-blue-500' href="https://www.anzen.mofa.go.jp/">
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
            <Sections.Posts type='tourism' />
        </div>
    );
}

export default RoulettePage;
