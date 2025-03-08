import { Separator } from "@radix-ui/react-dropdown-menu"
import { Mail } from "lucide-react"
import Link from "next/link"
import * as Elements from '@/app/components/elements/index';

const Footer = () => {
    return (
        <footer className="w-full border-t bg-background p-2">
            <div className="container py-10">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium">ともきちの旅行日記</h3>
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
                            <li>
                                <Link href='/diary' className="text-muted-foreground hover:text-foreground">
                                    旅行日記
                                </Link>
                            </li>
                            <li>
                                <Link href='/tourism' className="text-muted-foreground hover:text-foreground">
                                    観光情報
                                </Link>
                            </li>
                            <li>
                                <Link href='/gallery' className="text-muted-foreground hover:text-foreground">
                                    写真ギャラリー
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium">リンク</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href='/about' className="text-muted-foreground hover:text-foreground">
                                    サイトについて
                                </Link>
                            </li>
                            <li>
                                <Link href='/privacy' className="text-muted-foreground hover:text-foreground">
                                    プライバシーポリシー
                                </Link>
                            </li>
                            <li>
                                <Link href='/terms' className="text-muted-foreground hover:text-foreground">
                                    利用規約
                                </Link>
                            </li>
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
                    <p className="text-sm text-muted-foreground">&copy; 2022-{new Date().getFullYear()} ともきちの旅行日記 All rights reserved.</p>
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
