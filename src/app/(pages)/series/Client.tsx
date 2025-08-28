"use client";

import { motion } from "framer-motion";
import {
  staggerContainerVariants,
} from "@/components/animation";
import { featuredSeries } from "@/data/series";
import HeroSection from "@/components/sections/HeroSection";
import SeriesCard from "@/components/featured/series/SeriesCard";

const Client = () => {
  return (
    <div>
      {/* ==================== Hero Section ==================== */}
      <HeroSection
        src="/images/Greece/oia-castle-sunset-view.jpg"
        alt="Series Hero Image"
        pageTitle="SERIES"
        pageMessage="テーマで旅を深掘りする"
      />

      {/* ==================== Series List ==================== */}
      <motion.section
        variants={staggerContainerVariants(0.1)}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredSeries.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Client;
