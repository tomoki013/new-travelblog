"use client";

import AllDestination from "@/components/featured/destination/allDestination";
import { AllDestinationProps } from "@/types/types";

const Client = ({ regionData }: AllDestinationProps) => {
  return (
    <div>
      {/* ==================== Hero Section ==================== */}
      <section className="relative h-72 md:h-96 flex items-center justify-center text-white text-center">
        <div className="absolute inset-0 bg-secondary" />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            DESTINATIONS
          </h1>
          <p className="text-md md:text-lg mt-4 max-w-2xl">
            世界地図から、旅先を探す
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* ==================== インタラクティブな世界地図 ==================== */}
        {/* <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4">インタラクティブ・ワールドマップ</h2>
          <p className="text-center text-gray-600 mb-8">
            色が変わっている国・地域をクリックすると、その場所のまとめページに移動します。
          </p>
          <div className="w-full h-[500px] border rounded-lg overflow-hidden">
            <D3WorldMap 
              width={960} 
              height={500}
              visitedSlugs={visitedCountrySlugs} // 訪問済みの国を渡す
            />
          </div>
        </motion.section> */}

        {/* ==================== 地域別リスト ==================== */}
        <AllDestination
          regionData={regionData}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          countryStyle="border-b-2 border-secondary"
        />
      </div>
    </div>
  );
};

export default Client;
