"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/components/common/animation";
import HeroSection from "@/components/pages/HeroSection";

interface ClientProps {
  children: React.ReactNode;
}

const Client = ({ children }: ClientProps) => {
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
        variants={staggerContainer()}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{children}</div>
      </motion.section>
    </div>
  );
};

export default Client;
