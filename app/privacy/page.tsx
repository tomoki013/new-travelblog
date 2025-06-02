import { Separator } from "@radix-ui/react-select"
import { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata = {
    title: 'プライバシーポリシー',
    description: 'ともきちの旅行日記のプライバシーポリシーです。個人情報の取り扱いやCookieの使用について詳しく説明しています。',
    openGraph: {
        title: 'プライバシーポリシー',
        description: 'ともきちの旅行日記のプライバシーポリシーです。個人情報の取り扱いやCookieの使用について詳しく説明しています。',
    },
    twitter: {
        title: 'プライバシーポリシー',
        description: 'ともきちの旅行日記のプライバシーポリシーです。個人情報の取り扱いやCookieの使用について詳しく説明しています。',
    },
    robots: {
        index: false,
        follow: true,
    },
}

const PrivacyPage = () => {
    return (
        <div className="container py-12">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-8 text-4xl font-bold">プライバシーポリシー</h1>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p>当サイト「ともきちの旅行日記」（以下、「当サイト」）は、ユーザーの個人情報の保護を重要と考えています。本プライバシーポリシーでは、当サイトがどのように個人情報を収集、使用、保護するかについて説明します。</p>
                    <h2>1.収集する情報</h2>
                    <p>当サイトでは、以下の情報を収集する場合があります：</p>
                    <ul>
                        <li>お名前</li>
                        <li>メールアドレス</li>
                        <li>お問い合わせ内容</li>
                        <li>アクセスログ情報</li>
                        <li>Cookieを通じて収集される情報</li>
                    </ul>

                    <h2>2.情報の使用目的</h2>
                    <p>収集した情報は、以下の目的で使用されます：</p>
                    <ul>
                        <li>お問い合わせ内容への回答</li>
                        <li>サービスの改善</li>
                        <li>新機能やコンテンツの開発</li>
                        <li>利用状況の分析</li>
                    </ul>

                    <h2>3.個人情報の保護</h2>
                    <p>当サイトは、収集した個人情報の漏洩、紛失、改ざんなどを防ぐため、適切なセキュリティ対策を実施しています。</p>

                    <h2>4.第三者への提供</h2>
                    <p>当サイトは、以下の場合を除き、収集した個人情報を第三者に提供することはありません：</p>
                    <ul>
                        <li>ユーザーの同意がある場合</li>
                        <li>法令に基づく場合</li>
                        <li>人の生命、身体または財産の保護に必要がある場合</li>
                    </ul>

                    <h2>5.Cookieの使用</h2>
                    <p>当サイトでは、ユーザー体験の向上のためにCookieを使用しています。ブラウザの設定でCookieを無効にすることも可能ですが、一部の機能が正常に動作しなくなる可能性があります。</p>

                    <h2>6.アクセス解析</h2>
                    <p>当サイトでは、Googleアナリティクスを使用してアクセス情報を収集しています。収集された情報は、サイトの改善とユーザー体験の向上のために使用されます。</p>

                    <h2>7.お問い合わせ</h2>
                    <p>本プライバシーポリシーに関するお問い合わせは、<Link href='/contact' className="text-primary hover:underline">お問い合わせフォーム</Link>よりご連絡ください。</p>

                    <h2>8.プライバシーポリシーの変更</h2>
                    <p>当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更がある場合は、サイト上で通知します。</p>

                    <Separator className="my-8" />

                    <p className="text-sm text-muted-foreground">最終更新日：2025年3月7日</p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPage;
