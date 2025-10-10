"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaYoutube, FaTiktok, FaGithub } from "react-icons/fa";
import { sectionVariants } from "@/components/common/animation";
import HeroSection from "@/components/pages/HeroSection";

// --- Data ---
const socialAccounts = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@tomokichi_travel",
    IconComponent: FaYoutube,
    iconColor: "text-red-600",
    conceptTitle: "旅の没入体験",
    description:
      "旅先の風景や空気感を、Vlog形式でお届けします。映像と音で、まるでその場にいるかのような体験をお楽しみください。長めの動画で旅のストーリーをじっくり追体験したい方におすすめです。",
    ctaText: "YouTubeでチャンネル登録する",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@tomokichitravel",
    IconComponent: FaTiktok,
    iconColor: "text-black",
    conceptTitle: "旅の「一口」情報",
    description:
      "旅先で見つけたグルメや、あまり知られていない絶景スポットを30秒程度のショート動画で紹介しています。次の旅行先を探すヒントや、すきま時間での情報収集に最適です。",
    ctaText: "TikTokでフォローする",
  },
  {
    name: "GitHub",
    url: "https://github.com/tomoki013/new-travelblog",
    IconComponent: FaGithub,
    iconColor: "text-gray-800",
    conceptTitle: "ブログの裏側",
    description:
      "このブログサイト（tomokichidiary）のソースコードを公開しています。Next.jsやWeb制作の技術的な側面に興味がある方向けです。サイトの改善提案やコントリビュートもお待ちしています。",
    ctaText: "GitHubでコードを見る",
  },
];

export default function Client() {
  return (
    <div>
      {/* ==================== Hero Section ==================== */}
      <HeroSection
        src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1920"
        alt="Social Media Hero Image"
        pageTitle="Follow Me"
        pageMessage="各SNSの活動内容やコンセプトをご紹介します"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* ==================== SNS Cards List ==================== */}
        {socialAccounts.map((account, idx) => {
          const motionProps =
            idx === 0
              ? {
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8 },
                }
              : {
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 0.8 },
                };
          return (
            <motion.section
              key={account.name}
              {...motionProps}
              className="bg-gray-50 p-8 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4 mb-6">
                <account.IconComponent
                  className={`text-5xl ${account.iconColor}`}
                />
                <h2 className="text-4xl font-bold">{account.name}</h2>
              </div>

              <div className="pl-2">
                <h3 className="text-xl font-semibold text-teal-600 mb-2">
                  {account.conceptTitle}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {account.description}
                </p>

                {/* GitHub以外は動画埋め込みエリアを表示 */}
                {account.name !== "GitHub" && (
                  <>
                    <h4 className="font-bold mb-2">最近の投稿</h4>
                    <div className="w-full aspect-video bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">
                        （ここに最新の投稿が埋め込まれます）
                      </p>
                    </div>
                  </>
                )}

                <Link
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-8 px-8 py-3 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-700 transition-colors"
                >
                  {account.ctaText} →
                </Link>
              </div>
            </motion.section>
          );
        })}

        {/* ==================== 締めのメッセージ ==================== */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center py-10"
        >
          <p className="text-xl font-semibold text-gray-800">
            お好きなプラットフォームで、お気軽にフォローしてください！
            <br />
            あなたのフォローが、活動の大きな励みになります。
          </p>
        </motion.section>
      </div>
    </div>
  );
}
