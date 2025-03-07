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
  	title: "旅行日記 | Travel Diary",
  	description: "日本と世界の旅行記録と観光情報",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
  	return (
    	<html lang="ja">
      		<body
        		className={`${geistSans.variable} ${geistMono.variable} antialiased p-2`}
      		>
				<ThemeProvider
					attribute='class'
					defaultTheme="dark"
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
