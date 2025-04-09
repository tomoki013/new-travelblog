import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'ともきちの旅行日記｜お問い合わせ',
    description: '旅行に関するご質問、サイトへのご意見やご感想、さらにはコラボレーションや広告掲載のお問い合わせなど、どんなご相談もお気軽にご連絡ください。迅速かつ丁寧な対応を心がけております。',
};

const ContactPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="rounded-lg p-8 bg-white shadow-lg">
                <h1 className="text-black text-4xl font-bold">準備中...</h1>
                <h1 className="text-black text-4xl font-bold">しばらくお待ちください。</h1>
            </div>
        </div>
    );
}

export default ContactPage;
