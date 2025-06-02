import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import * as layouts from '@/app/components/layouts/index';
import * as Sections from "@/app/components/sections/index";

const geistSans = Geist({
  	variable: "--font-geist-sans",
  	subsets: ["latin"],
});

const geistMono = Geist_Mono({
  	variable: "--font-geist-mono",
  	subsets: ["latin"],
});

export const metadata: Metadata = {
  	title: {
  	  	default: 'ともきちの旅行日記 | Travel Diary',
  	  	template: '%s | ともきちの旅行日記',
  	},
  	description: 'ともきちの旅行日記は、日本国内外の旅先体験を写真とコラムで詳細に紹介するブログです。観光スポットやグルメ、穴場レポートを網羅し、文化体験記事や現地グルメコラム、旅費計算・世界時計・旅行先ルーレット・税金計算・予算管理機能など多彩なツールで旅行準備から思い出の記録までサポートし、旅のプラン立案を支援。',
  	authors: [{ name: 'ともきち' }],
  	openGraph: {
  	  	title: 'ともきちの旅行日記 | Travel Diary',
  	  	description: '日本と世界の美しい風景、文化、食べ物を通じて、新しい旅の発見をお届けする旅行ブログ。',
  	  	url: 'https://tomokichidiary.netlify.app/',
  	  	siteName: 'ともきちの旅行日記',
  	  	type: 'website',
  	  	images: [
  	  	  	{
  	  	  	  	url: 'favicon.ico',
  	  	  	  	width: 1200,
  	  	  	  	height: 630,
  	  	  	  	alt: 'ともきちの旅行日記',
  	  	  	},
  	  	],
  	},
  	twitter: {
  	  	card: 'summary_large_image',
  	  	title: 'ともきちの旅行日記 | Travel Diary',
  	  	description: '日本と世界の美しい風景、文化、食べ物を通じて、新しい旅の発見をお届けする旅行ブログ。',
  	  	images: ['favicon.ico'],
  	},
  	metadataBase: new URL('https://tomokichidiary.netlify.app'),
}

// ビューポートの設定を独立させる
export const viewport = { // 👈 このように分離するのが正しい書き方
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	// 現在の時間を取得してテーマを設定
	const currentHour = new Date().getHours();
	const defaultTheme = currentHour >= 18 || currentHour < 6 ? "dark" : "light";

  	return (
    	<html lang="ja">
			<head>

				{/* GSC */}
				<meta name="google-site-verification" content="qd9h_oeUkXKK0F-u4U5Z-c540MUq_Agst3K0rF8ERdM" />
				{/* GA */}
				<meta name="google-adsense-account" content="ca-pub-8687520805381056" />
				{/* 自動広告 */}
				<Script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8687520805381056"
	 				crossOrigin="anonymous"
					strategy="afterInteractive"
	 			></Script>
				{/* Google tag (gtag.js) */}
				<Script async src="https://www.googletagmanager.com/gtag/js?id=G-XYSW6RY98H"></Script>
				<script
					dangerouslySetInnerHTML={{
						__html:`
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
						
							gtag('config', 'G-XYSW6RY98H');
						`,
					}}>
				</script>
				
			</head>
      		<body
        		className={`${geistSans.variable} ${geistMono.variable} antialiased p-2`}
      		>
				<ThemeProvider
					attribute='class'
					defaultTheme={defaultTheme}
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex min-h-screen flex-col">
						<layouts.Header />
						<main className="flex-1">{children}</main>
						<layouts.Footer />
					</div>
					<Sections.ItineraryBanner />
				</ThemeProvider>
      		</body>
    	</html>
  	);
}
