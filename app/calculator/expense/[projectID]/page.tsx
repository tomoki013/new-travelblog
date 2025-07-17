import ExpenseClient from '../ExpenseClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '割り勘計算',
    description: '旅行の費用を記録し、簡単に割り勘計算。',
    robots: {
        index: false, // このページは検索エンジンにインデックスさせない
        follow: false,
    }
}

const ExpensePage = async (props: { params: Promise<{ projectID: string }>}) => {
    const params = await props.params;
    // URLデコードを行う
    const decodedProjectID = await decodeURIComponent(params.projectID);

    return (
        <div className="container py-12">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-8" role="alert">
                <p className="font-bold">⚠️ 注意事項</p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li>このページの情報は、お使いのブラウザ（ローカルストレージ）にのみ保存されます。</li>
                    <li><strong className='underline text-red-600'>現在は一人での利用を想定したバージョンです。</strong>URLを共有しても、他の人があなたの入力内容を見ることはできません。</li>
                     <li>安全のため、本名や電話番号などの個人情報は<strong className='underline text-red-600'>絶対に</strong>入力しないでください。</li>
                </ul>
            </div>
            <ExpenseClient projectID={decodedProjectID} />
        </div>
    );
};

export default ExpensePage;
