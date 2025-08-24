"use client";

import { motion } from "framer-motion";
import { Region } from "@/types/types";
import Link from "next/link";
import { sectionVariants } from "@/components/animation";

interface ClientProps {
  groupedRegions: Record<string, (Region & { children: Region[] })[]>;
}

const Client = ({ groupedRegions }: ClientProps) => {
  return (
    <div>
      {/* ==================== Hero Section ==================== */}
      <section className="relative h-72 md:h-96 flex items-center justify-center text-white text-center">
        <div className="absolute inset-0 bg-gray-800" />
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
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            すべての旅行先一覧
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(groupedRegions).map(([continent, countries]) => (
              <div key={continent}>
                <h3 className="text-2xl font-bold border-b-2 border-secondary pb-2 mb-4">
                  {continent}
                </h3>
                <ul className="space-y-2">
                  {countries.map((country) => (
                    <li key={country.slug}>
                      <Link
                        href={`/destination/${country.slug}`}
                        className="font-semibold text-foreground hover:text-secondary"
                      >
                        ・{country.name}
                      </Link>
                      {country.children.length > 0 && (
                        <ul className="ml-6 mt-1 space-y-1">
                          {country.children.map((city) => (
                            <li key={city.slug}>
                              <Link
                                href={`/destination/${city.slug}`}
                                className="text-foreground hover:text-secondary"
                              >
                                - {city.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Client;
