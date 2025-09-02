"use client";

import { useRef } from "react";
import { staggerContainerVariants } from "../animation";
import WorldMap, { WorldMapHandle } from "../featured/worldMap/WorldMap";
import { motion } from "framer-motion";
import { regionData } from "@/data/region";

const Destination = () => {
  const worldMapRef = useRef<WorldMapHandle>(null);
  // すべての国名を小文字の配列として抽出
  const allCountryNames = regionData.flatMap((continent) =>
    continent.countries.map((country) => country.slug)
  );

  const handleResetZoom = () => {
    worldMapRef.current?.resetZoom();
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainerVariants(0.2)}
      className="py-24 px-6 md:px-8 max-w-5xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          世界地図から、旅先を探す
        </h2>
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6" />
      </div>
      <div className="relative">
        <WorldMap
          ref={worldMapRef}
          highlightedRegions={allCountryNames}
          isClickable={true}
          isTooltip={true}
          regionData={regionData}
          isZoomable={true}
        />
        <button
          onClick={handleResetZoom}
          className="absolute bottom-4 right-4 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="ズームをリセット"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="m15 18-6-6 6-6" />
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </motion.section>
  );
};

export default Destination;
