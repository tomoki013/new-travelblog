"use client";

import { staggerContainerVariants } from "../animation";
import WorldMap from "../featured/worldMap/WorldMap";
import { motion } from "framer-motion";
import { regionData } from "@/data/region";

const Destination = () => {
  // すべての国名を小文字の配列として抽出
  const allCountryNames = regionData.flatMap((continent) =>
    continent.countries.map((country) => country.slug)
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainerVariants(0.2)}
      className="py-24 px-6 md:px-8 max-w-5xl mx-auto"
    >
      <WorldMap highlightedRegions={allCountryNames} isClickable={true} />
    </motion.section>
  );
};

export default Destination;
