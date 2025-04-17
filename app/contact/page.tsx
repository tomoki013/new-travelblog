import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'ともきちの旅行日記｜お問い合わせ',
    description: '旅行に関するご質問、サイトへのご意見やご感想、さらにはコラボレーションや広告掲載のお問い合わせなど、どんなご相談もお気軽にご連絡ください。迅速かつ丁寧な対応を心がけております。',
};

const ContactPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="rounded-xl p-10 bg-white shadow-2xl max-w-lg w-full dark:bg-gray-800">
                <h1 className="text-gray-800 text-3xl font-extrabold mb-6 text-center dark:text-gray-100">お問い合わせ</h1>
                <p className="text-gray-600 text-base mb-4 leading-relaxed dark:text-gray-300">
                    ご連絡は以下のメールアドレスまでお願いいたします：
                    <Link href="mailto:gaomuyouxi81@gmail.com" className="text-blue-600 font-medium hover:underline ml-2 dark:text-blue-400">gaomuyouxi81@gmail.com</Link>
                </p>
                <p className="text-gray-600 text-base leading-relaxed dark:text-gray-300">
                    現在、お問い合わせフォームは作成中です。完成までしばらくお待ちください。
                </p>
            </div>
        </div>
    );
}

export default ContactPage;
