"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sectionVariants } from "@/components/animation";
import WorldMap from "../worldMap/WorldMap";
import { regionData } from "@/data/region";

const AboutMeSection = () => {
  // 訪問した国名を小文字の配列として抽出
  const visitedCountryNames = regionData.flatMap((continent) =>
    continent.countries.map((country) => country.slug)
  );

  const visitedCountriesCount = visitedCountryNames.length;
  const totalCountries = 196;

  return (
    <motion.section
      className="py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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
        {/* 訪問国を可視化するマップ */}
        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            旅の記録 - My Footprints
          </h3>
          <WorldMap
            highlightedRegions={visitedCountryNames}
            isClickable={true}
          />
          <div className="text-center mt-8">
            <p className="text-xl md:text-2xl font-bold">
              <span className="text-3xl md:text-4xl text-primary font-extrabold">
                {visitedCountriesCount}
              </span>
              <span className="text-lg md:text-xl mx-2">/</span>
              <span className="text-lg md:text-xl">{totalCountries}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMeSection;
