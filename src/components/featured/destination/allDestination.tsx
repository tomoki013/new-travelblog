"use client";

import { motion } from "framer-motion";
import { sectionVariants } from "@/components/animation";
import { AllDestinationProps } from "@/types/types";
import ContinentSection from "./ContinentSection";

interface PageProps extends AllDestinationProps {
  className: string;
  countryStyle?: string;
}

const AllDestination = ({ regionData, className, countryStyle }: PageProps) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className={`${className}`}>
        {regionData.map((continent) => (
          <ContinentSection
            key={continent.slug}
            continent={continent}
            countryStyle={countryStyle}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default AllDestination;
