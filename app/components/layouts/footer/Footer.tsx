import { Separator } from "@radix-ui/react-dropdown-menu"
import { Mail } from "lucide-react"
import Link from "next/link"
import * as Elements from '@/app/components/elements/index';

export const contentsList = [
    { name: "旅行日記", pass: "/diary" },
    { name: "観光情報", pass: "/tourism" },
    { name: "写真ギャラリー", pass: "/gallery" },
];

export const linkList = [
    { name: "サイトについて", pass: "/about" },
    { name: "プライバシーポリシー", pass: "/privacy" },
    { name: "利用規約", pass: "/terms" },
];

export const appList = [
    { name: "旅行先ルーレット", pass: "/roulette" },
    { name: "世界時計", pass: "/clock" },
    { name: "旅費計算", pass: "/calculator/expense" },
    { name: "税金計算", pass: "/calculator/tax" },
    // { name: "為替計算", pass: "/calculator/currency" },
];

const Footer = () => {
    return (
        <footer className="w-full border-t bg-background p-2">
            <div className="container py-10">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5">
                    <div className="space-y-3">
                        <Link href="/" className="text-lg font-medium">ともきちの旅行日記</Link>
                        <p className="text-sm text-muted-foreground">日本と世界の旅行記録と観光情報を発信するブログサイトです。</p>
                        <div className="flex space-x-3">
                            <Elements.InstagramIcon />
                            <span className="sr-only">Instagram</span>
                            <Elements.YouTubeIcon />
                            <span className="sr-only">YouTube</span>
                            <Elements.TikTokIcon />
                            <span className="sr-only">TikTok</span>
                            <Elements.GitHubIcon />
                            <span className="sr-only">GitHub</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium">コンテンツ</h3>
                        <ul className="space-y-2 text-sm">
                            {contentsList.map((content) => (
                                <li key={content.name}>
                                    <Link href={content.pass} className="text-muted-foreground hover:text-foreground">
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
                                    <Link href={link.pass} className="text-muted-foreground hover:text-foreground">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium">アプリ</h3>
                        <ul className="space-y-2 text-sm">
                            {appList.map((app) => (
                                <li key={app.name}>
                                    <Link href={app.pass} className="text-muted-foreground hover:text-foreground">
                                        {app.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium">お問い合わせ</h3>
                        <p className="text-sm text-muted-foreground">ご質問やお問い合わせは下記よりお願いします。</p>
                        <Link href='/contact' className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                            <Mail className="mr-2 h-4 w-4" />
                            お問い合わせフォーム
                        </Link>
                    </div>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-muted-foreground">&copy; 2024-{new Date().getFullYear()} ともきちの旅行日記. All rights reserved.</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <Link href='/privacy' className="hover:text-foreground">
                            プライバシーポリシー
                        </Link>
                        <Link href='/terms' className="hover:text-foreground">
                            利用規約
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
