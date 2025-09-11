import type { Metadata } from "next";
import {
  Caveat,
  Montserrat,
  Noto_Sans_JP,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import CookieBanner from "@/components/elements/CookieBanner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-playfair-display",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-caveat",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: {
    default: "ともきちの旅行日記 | Travel Diary",
    template: "%s | ともきちの旅行日記",
  },
  description:
    "ともきちの旅行日記は、日本国内外の旅先体験を写真とコラムで詳細に紹介するブログです。観光スポットやグルメ、穴場レポートを網羅し、文化体験記事や現地グルメコラム、旅費計算・世界時計・旅行先ルーレット・税金計算・予算管理機能など多彩なツールで旅行準備から思い出の記録までサポートし、旅のプラン立案を支援。",
  authors: [{ name: "ともきち" }],
  openGraph: {
    title: "ともきちの旅行日記 | Travel Diary",
    description:
      "日本と世界の美しい風景、文化、食べ物を通じて、新しい旅の発見をお届けする旅行ブログ。",
    url: "https://tomokichidiary.netlify.app/",
    siteName: "ともきちの旅行日記",
    type: "website",
    images: [
      {
        url: "favicon.ico",
        width: 1200,
        height: 630,
        alt: "ともきちの旅行日記",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ともきちの旅行日記 | Travel Diary",
    description:
      "日本と世界の美しい風景、文化、食べ物を通じて、新しい旅の発見をお届けする旅行ブログ。",
    images: ["favicon.ico"],
  },
  metadataBase: new URL("https://tomokichidiary.netlify.app"),
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* Google Search Console */}
        <meta
          name="google-site-verification"
          content="qd9h_oeUkXKK0F-u4U5Z-c540MUq_Agst3K0rF8ERdM"
        />

        {/* Google Adsense */}
        <meta name="google-adsense-account" content="ca-pub-8687520805381056" />

        {/* impact */}
        <meta
          name="impact-site-verification"
          content="6961c957-6c21-44ec-90ac-fbe728936d15"
        />

        {/* 自動広告 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8687520805381056"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        ></Script>

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XYSW6RY98H"
        ></Script>

        {/* Google Analytics */}
        <Script id="google-analytics">
          {`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-XYSW6RY98H');
					`}
        </Script>
      </head>
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} ${caveat.variable} ${notoSansJP.variable} antialiased`}
      >
        <ThemeProvider
          attribute={`class`}
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 text-sm md:text-base">{children}</main>
            <Footer />
          </div>
          <CookieBanner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
