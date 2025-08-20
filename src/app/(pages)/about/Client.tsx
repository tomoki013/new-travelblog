"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
// import Link from "next/link";

// Framer Motionのアニメーション設定
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Client = () => {
  return (
    <>
      {/* ==================== この旅について Section ==================== */}
      <motion.section
        className="py-20 md:py-28"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto px-6 text-foreground">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 ">
            この旅について - About this Journey
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-center">
            「次の冒険は、どこへ？」 <br />
            ふと、そんな言葉が頭に浮かんだ時、新しい旅が始まります。このブログは、私自身が旅の計画を立てる時のワクワク感や、現地で出会った息をのむような絶景、そして旅先での小さな発見を共有するために始めました。読者の皆さんの冒険心を刺激し、次の旅への一歩を踏み出すきっかけになれたら、これ以上嬉しいことはありません。
          </p>
        </div>
      </motion.section>

      {/* ==================== 中の人について Section ==================== */}
      <motion.section
        className="py-20 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-5xl mx-auto px-6 text-foreground">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            中の人について - About Me
          </h2>
          {/* 設計書のジグザグレイアウトを実装 */}
          <div className="space-y-20">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="w-full md:w-1/2">
                <Image
                  src="/images/Introduce/introduce.jpg"
                  alt="ともきちのプロフィール写真"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg object-cover max-h-100 overflow-hidden"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">旅に魅せられて</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  京都在住の大学生です。特に好きなのは、歴史を感じる建築物と、その土地の空気を一変させる夕陽を眺める時間です。
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
              <div className="w-full md:w-1/2">
                <Image
                  src="/images/Greece/fira-shopping-street.jpg"
                  alt="旅の様子のスナップ写真"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg object-cover max-h-100 overflow-hidden"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">私の旅のスタイル</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  私の旅は、有名な観光地を巡るだけでなく、現地の人が通うカフェでのんびりしたり、裏路地をあてもなく散策したり、その土地の日常に溶け込むことを大切にしています。このブログでは、そうしたリアルな現地の雰囲気も伝えていきたいと思っています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ==================== 旅の記録 Section ==================== */}
      {/* <motion.section
            className="py-20 md:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <div className="max-w-5xl mx-auto px-6 text-center text-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-10">
                旅の記録 - My Footprints
              </h2>
              <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                今まで訪れた国や地域です。マップをクリックして、その土地の物語を覗いてみてください。
              </p> */}
      {/* トップページのインタラクティブな世界地図コンポーネントを想定 [cite: 101, 227] */}
      {/* <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p>インタラクティブな世界地図がここに表示されます</p>
              </div>
            </div>
          </motion.section> */}

      {/* ==================== コミュニティ Section ==================== */}
      {/* <motion.section
            className="py-20 md:py-28 bg-foreground text-background" // ベースカラーの黒を使用 [cite: 60]
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                一緒に旅をしませんか？ - Let&apos;s Journey Together
              </h2>
              <p className="text-lg mb-10">
                このブログは、読者の皆さんと一緒に作り上げていきたいと思っています。
                <br />
                SNSでの交流や、記事テーマの提案など、お気軽にご参加ください。
              </p>
              <div className="flex flex-wrap justify-center gap-4"> */}
      {/* サブアクセントの暖色系をボタンに使用 [cite: 62] */}
      {/* <motion.div
                  className="inline-block py-3 px-8 bg-transparent border-2 border-orange-400 text-orange-400 font-bold rounded-full transition-colors duration-300 hover:bg-orange-400 hover:text-gray-900"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={`#`}>SNSで繋がる</Link>
                </motion.div>
                <motion.div
                  className="inline-block py-3 px-8 bg-transparent border-2 border-orange-400 text-orange-400 font-bold rounded-full transition-colors duration-300 hover:bg-orange-400 hover:text-gray-900"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={`#`}>記事テーマを提案する</Link>
                </motion.div>
                <motion.div
                  className="inline-block py-3 px-8 bg-transparent border-2 border-orange-400 text-orange-400 font-bold rounded-full transition-colors duration-300 hover:bg-orange-400 hover:text-gray-900"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={`#`}>あなたの写真を投稿する</Link>
                </motion.div>
              </div>
            </div>
          </motion.section> */}
    </>
  );
};

export default Client;
