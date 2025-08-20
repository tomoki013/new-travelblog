"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Castle,
  Sunset,
  Landmark,
  Globe2,
  MountainSnow,
  BookText,
  type LucideProps, // 型としてインポート
} from "lucide-react";
import { featuredSeries } from "@/data/series";

// 1. アイコン名とコンポーネントを紐付けるマップを作成
const iconMap: { [key: string]: React.FC<LucideProps> } = {
  Castle,
  Sunset,
  Landmark,
  Globe2,
  MountainSnow,
};

const Client = () => {
  return (
    <div>
      {/* ==================== Hero Section ==================== */}
      <section className="relative h-64 md:h-80 flex items-center justify-center text-foreground">
        <Image
          src="/images/Greece/oia-castle-sunset-view.jpg"
          alt="Series Hero Image"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="relative z-10 text-center text-white/80">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            SERIES
          </h1>
          <p className="text-lg md:text-xl mt-2">テーマで旅を深掘りする</p>
        </div>
      </section>

      {/* ==================== Series List ==================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredSeries.map((series, idx) => {
            const IconComponent = iconMap[series.IconComponent];
            const motionProps =
              idx === 0 || 1
                ? {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.8 },
                  }
                : {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.8 },
                  };
            return (
              <Link href={`/series/${series.slug}`} key={series.id} passHref>
                <motion.div
                  {...motionProps}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                  className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl text-white flex flex-col justify-end p-6 cursor-pointer group"
                >
                  {/* Background Image & Overlay */}
                  <Image
                    src={series.imageUrl}
                    alt={series.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Decorative Frame */}
                  <div className="absolute inset-2 border-2 border-white/20 rounded-md"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Ribbon Banner for Title */}
                    <div className="relative mb-4 -mx-2">
                      <div className="bg-black/60 backdrop-blur-sm py-2 px-4 shadow-lg">
                        <h2 className="text-xl font-bold text-center truncate">
                          {series.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex-grow flex flex-col justify-center items-center text-center">
                      {IconComponent && (
                        <IconComponent
                          size={32}
                          className="mb-4 drop-shadow-lg"
                        />
                      )}
                      <p className="text-sm text-white/90 leading-relaxed drop-shadow-md">
                        {series.description}
                      </p>
                    </div>

                    {/* Status Block */}
                    <div className="mt-auto pt-4 border-t-2 border-white/20">
                      {/* <div className="flex items-center gap-2 text-sm">
                        <BookText size={16} className="text-amber-300" />
                        <span className="font-semibold text-amber-300">
                          発見した物語
                        </span>
                        <div className="flex-grow border-b-2 border-dotted border-white/30 mx-2"></div>
                        <span className="font-bold text-lg">
                          {series.articleCount}
                        </span>
                      </div> */}
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Client;
