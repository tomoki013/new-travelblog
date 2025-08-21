import { Separator } from "@radix-ui/react-select";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "ともきちの旅行日記のプライバシーポリシーです。個人情報の取り扱いやCookieの使用について詳しく説明しています。",
  openGraph: {
    title: "プライバシーポリシー",
    description:
      "ともきちの旅行日記のプライバシーポリシーです。個人情報の取り扱いやCookieの使用について詳しく説明しています。",
  },
  twitter: {
    title: "プライバシーポリシー",
    description:
      "ともきちの旅行日記のプライバシーポリシーです。個人情報の取り扱いやCookieの使用について詳しく説明しています。",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const PrivacyPage = () => {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:mx-8">
        <h1 className="mb-8 text-4xl font-bold">プライバシーポリシー</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            当サイト「ともきちの旅行日記」（以下、「当サイト」）は、ユーザーの個人情報の保護を重要と考えています。本プライバシーポリシーでは、当サイトがどのように個人情報を収集、使用、保護するかについて説明します。
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold">1.収集する情報</h2>
          <p>当サイトでは、以下の情報を収集する場合があります：</p>
          <ul className="list-disc pl-6">
            <li>
              お問い合わせフォームにご入力いただいた情報（お名前、メールアドレス、お問い合わせ内容）
            </li>
            <li>
              サーバーによって自動的に記録されるアクセスログ情報（IPアドレス、ブラウザの種類、リファラなど）
            </li>
            <li>
              Cookieを通じて収集される、個人を特定しない形でのサイト利用履歴
            </li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold">2.情報の使用目的</h2>
          <p>収集した情報は、以下の目的で使用されます：</p>
          <ul className="list-disc pl-6">
            <li>お問い合わせ内容への回答および連絡</li>
            <li>サービスの安定的な提供と改善</li>
            <li>新機能や新しいコンテンツの開発の参考</li>
            <li>当サイトの利用状況の分析、およびマーケティング活動</li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold">3.個人情報の保護</h2>
          <p>
            当サイトは、収集した個人情報の漏洩、紛失、改ざんなどを防ぐため、適切なセキュリティ対策を実施し、厳重に管理いたします。
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold">4.第三者への提供</h2>
          <p>
            当サイトは、以下の場合を除き、収集した個人情報を第三者に提供することはありません：
          </p>
          <ul className="list-disc pl-6">
            <li>ユーザーご本人の同意がある場合</li>
            <li>法令に基づく開示請求があった場合</li>
            <li>
              人の生命、身体または財産の保護のために必要がある場合であって、ご本人の同意を得ることが困難であるとき
            </li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold">5.Cookieの使用について</h2>
          <p>
            当サイトでは、ユーザーの利便性向上、およびサイトの利用状況の分析のためにCookie（クッキー）を使用しています。Cookieとは、ユーザーがサイトを訪れた際に、そのユーザーのコンピュータ内に記録される小さなテキストファイルのことです。これにより、次回以降のアクセス時に、より快適にサービスをご利用いただくことが可能になります。
          </p>
          <p>
            ユーザーはご自身のブラウザ設定を変更することにより、Cookieの使用を無効にすることができます。具体的な設定方法については、下記の「Cookieを無効化する方法」の項目をご参照ください。
          </p>

          <h3 id="how-to-disable-cookies">Cookieを無効化する方法</h3>
          <p>
            主要なブラウザのCookie設定の変更方法については、以下の各社公式サポートページをご確認ください。設定を変更することにより、当サイトおよび他のウェブサイトからのCookieを無効にできますが、一部のウェブサイトが正常に機能しなくなる可能性があります。
          </p>
          <ul className="list-disc pl-6">
            <li>
              <Link
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-secondary"
              >
                Google Chrome
              </Link>
            </li>
            <li>
              <Link
                href="https://support.mozilla.org/ja/kb/block-websites-storing-cookies-site-data-firefox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-secondary"
              >
                Mozilla Firefox
              </Link>
            </li>
            <li>
              <Link
                href="https://support.apple.com/ja-jp/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-secondary"
              >
                Apple Safari
              </Link>
            </li>
            <li>
              <Link
                href="https://support.microsoft.com/ja-jp/microsoft-edge/microsoft-edge-%E3%81%A7-cookie-%E3%82%92%E5%89%8A%E9%99%A4%E3%81%99%E3%82%8B-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-secondary"
              >
                Microsoft Edge
              </Link>
            </li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold">6.アクセス解析ツールについて</h2>
          <p>
            当サイトでは、サービスの向上を目的として、Google社の提供するアクセス解析ツール「Google
            Analytics」を利用しています。Google
            Analyticsは、トラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。なお、ブラウザの設定でCookieそのものを拒否している場合、当サイトで「同意する」を選択しても、Google
            Analyticsによる情報収集は行われません。
          </p>
          <p>
            この機能は、お使いのブラウザでCookieを無効にすることで収集を拒否することが可能です。Google
            Analyticsの利用規約およびプライバシーポリシーに関する詳細は、Google社のサイトをご確認ください。
          </p>
          <ul className="list-disc pl-6">
            <li>
              <Link
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-secondary"
              >
                Google Analytics利用規約
              </Link>
            </li>
            <li>
              <Link
                href="https://policies.google.com/privacy?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-secondary"
              >
                Googleプライバシーポリシー
              </Link>
            </li>
          </ul>
          <p>
            また、Googleによるアクセス情報の収集を無効にしたい場合は、Google社が提供する「Google
            Analyticsオプトアウトアドオン」をご利用ください。
          </p>
          <ul className="list-disc pl-6">
            <li>
              <Link
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-secondary"
              >
                Google Analyticsオプトアウトアドオン
              </Link>
            </li>
          </ul>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold">7.お問い合わせ</h2>
          <p>
            本プライバシーポリシーに関するお問い合わせは、
            <Link
              href="/contact"
              className="text-primary underline hover:text-secondary"
            >
              お問い合わせフォーム
            </Link>
            よりご連絡ください。
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold">8.プライバシーポリシーの変更</h2>
          <p>
            当サイトは、法令の変更やサービスの改善に伴い、本プライバシーポリシーを事前の予告なく変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載したときから効力を生じるものとします。
          </p>

          <Separator className="my-8" />

          <p className="text-sm text-muted-foreground">
            最終更新日：2025年7月7日
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
