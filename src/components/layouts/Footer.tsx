import {
  FOOTER_CONTENTS_LIST,
  FOOTER_LINK_LIST,
  SOCIAL_LIST,
} from "@/constants/navigation";
import { Mail } from "lucide-react";
import Link from "next/link";
import { FaBlog } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-16 px-8">
      {/* アフィリエイトポリシー */}
      <div className="italic">
        <p>
          ※当サイトはアフィリエイト広告を利用しています。掲載する商品・サービスは、運営者が実際に試し、自信を持っておすすめできるものに限定しています。
          詳しい運営方針については
          <Link
            href={`/affiliates`}
            className="text-secondary underline hover:text-primary"
          >
            アフィリエイトポリシー
          </Link>
          をご覧ください。
        </p>
      </div>
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5">
          <div className="space-y-3">
            <Link href="/" className="text-lg font-medium">
              ともきちの旅行日記
            </Link>
            <p className="text-sm text-muted-foreground">
              日本と世界の旅行記録と観光情報を発信するブログサイトです。
            </p>
            <div className="flex space-x-3">
              {SOCIAL_LIST.map((sns) => (
                <Link
                  key={sns.name}
                  href={sns.pass}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-muted-foreground hover:text-secondary"
                >
                  {sns.icon}
                  <span className="sr-only">{sns.name}</span>
                </Link>
              ))}
            </div>
            <Link
              href={`/social`}
              className="text-sm text-muted-foreground hover:text-secondary"
            >
              Follow Me
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">コンテンツ</h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_CONTENTS_LIST.map((content) => (
                <li key={content.name}>
                  <Link
                    href={content.pass}
                    className="flex items-center text-muted-foreground hover:text-secondary"
                  >
                    {content.name}
                    {content.isNew && (
                      <span className="ml-2 rounded-md bg-primary px-1.5 py-0.5 text-xs font-semibold leading-none text-primary-foreground">
                        NEW
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">リンク</h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINK_LIST.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.pass}
                    className="text-muted-foreground hover:text-secondary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">お問い合わせ</h3>
            <p className="text-sm text-muted-foreground">
              ご質問やお問い合わせは下記よりお願いします。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-secondary"
            >
              <Mail className="mr-2 h-4 w-4" />
              お問い合わせフォーム
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">記事テーマをリクエスト</h3>
            <p className="text-sm text-muted-foreground">
              記事テーマを募集しています。興味のあるテーマがあれば、ぜひリクエストしてください。
            </p>
            <Link
              href="/request"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-secondary"
            >
              <FaBlog className="mr-2 h-4 w-4" />
              記事テーマ募集フォーム
            </Link>
          </div>
        </div>

        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-secondary to-transparent" />

        <div className="flex flex-col sm:items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2024-{new Date().getFullYear()} ともきちの旅行日記. All
            rights reserved.
          </p>
          <div className="hidden sm:flex flex-col md:flex-row justify-center md:justify-baseline md:items-center gap-2 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-secondary">
              プライバシーポリシー
            </Link>
            <span className="hidden md:block">｜</span>
            <Link href="/terms" className="hover:text-secondary">
              利用規約
            </Link>
            <span className="hidden md:block">｜</span>
            <Link href="/sitemap" className="hover:text-secondary">
              サイトマップ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
