import { Mail } from "lucide-react";
import Link from "next/link";
import { FaBlog, FaGithub, FaTiktok, FaYoutube } from "react-icons/fa";

export const contentsList = [
  { name: "地域別", pass: "/destination" },
  { name: "シリーズ一覧", pass: "/series" },
  { name: "ブログ一覧", pass: "/posts" },
  { name: "写真ギャラリー", pass: "/gallery" },
];

export const linkList = [
  { name: "サイトについて", pass: "/about" },
  { name: "プライバシーポリシー", pass: "/privacy" },
  { name: "利用規約", pass: "/terms" },
  { name: "サイトマップ", pass: "/sitemap" },
];

export const socialList = [
  // {
  //   name: "Instagram",
  //   pass: "https://www.instagram.com/tomokichi_travel/",
  //   icon: <FaInstagram />,
  // },
  {
    name: "YouTube",
    pass: "https://www.youtube.com/@tomokichi_travel",
    icon: <FaYoutube />,
  },
  {
    name: "TikTok",
    pass: "https://www.tiktok.com/@tomokichitravel",
    icon: <FaTiktok />,
  },
  {
    name: "GitHub",
    pass: "https://github.com/tomoki013/new-travelblog",
    icon: <FaGithub />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-16 px-8">
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
              {socialList.map((sns) => (
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
              {contentsList.map((content) => (
                <li key={content.name}>
                  <Link
                    href={content.pass}
                    className="text-muted-foreground hover:text-secondary"
                  >
                    {content.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">リンク</h3>
            <ul className="space-y-2 text-sm">
              {linkList.map((link) => (
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
          <div className="flex flex-col md:flex-row justify-center md:justify-baseline md:items-center gap-2 text-sm text-muted-foreground">
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
