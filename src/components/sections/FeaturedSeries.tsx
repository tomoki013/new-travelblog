"use client";

import { featuredSeries } from "@/data/series";
import SeriesCard from "../elements/SeriesCard";
import { motion } from "framer-motion";
import Button from "../elements/Button";

const FeaturedSeries = () => {
  return (
    <motion.section
      className="py-24 px-6 md:px-8 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      {/* セクションタイトル */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          Featured Series
        </h2>
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6"></div>
      </div>

      {/* カードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {featuredSeries.slice(0, 6).map((series) => (
          <SeriesCard key={series.id} series={series} />
        ))}
      </div>

      {/* ボタン */}
      <Button href={`/series`}>シリーズ一覧を見る</Button>
    </motion.section>
  );
};

export default FeaturedSeries;
