import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { ThemeProvider } from "@/components/theme-provider";
import * as layouts from '@/app/components/layouts/index';

const geistSans = Geist({
  	variable: "--font-geist-sans",
  	subsets: ["latin"],
});

const geistMono = Geist_Mono({
  	variable: "--font-geist-mono",
  	subsets: ["latin"],
});

export const metadata: Metadata = {
  	title: "ともきちの旅行日記 | Travel Diary",
  	description: "日本と世界の旅行記録と観光情報",
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
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8687520805381056"
	 crossOrigin="anonymous"></script>
				{/* Google tag (gtag.js) */}
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-XYSW6RY98H"></script>
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
				</ThemeProvider>
      		</body>
    	</html>
  	);
}
