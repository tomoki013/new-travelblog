"use client";

import { featuredSeries } from "@/data/series";
import SeriesCard from "../elements/SeriesCard";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import {
  sectionVariants,
  staggerContainerVariants,
  slideInUpVariants,
} from "@/components/animation";

const FeaturedSeries = () => {
  return (
    <motion.section
      className="py-24 px-6 md:px-8 max-w-6xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      {/* セクションタイトル */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          Featured Series
        </h2>
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6"></div>
      </div>

      {/* カードグリッド */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        variants={staggerContainerVariants(0.1)}
      >
        {featuredSeries.slice(0, 6).map((series) => (
          <motion.div key={series.id} variants={slideInUpVariants}>
            <SeriesCard series={series} />
          </motion.div>
        ))}
      </motion.div>

      {/* ボタン */}
      <Button href={`/series`}>シリーズ一覧を見る</Button>
    </motion.section>
  );
};

export default FeaturedSeries;
