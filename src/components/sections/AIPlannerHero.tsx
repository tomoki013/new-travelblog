"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const AIPlannerHero = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/Greece/oia-castle-sunset-view.jpg"
        alt="Oia Castle Sunset View"
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="absolute inset-0 bg-black/50 -z-10" />

      <div className="z-10 max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl font-bold mb-4 leading-tight text-shadow-[2px_2px_10px_rgba(0,0,0,0.5)]"
        >
          AIと創る、あなただけの旅
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto"
        >
          面倒な旅行計画はAIにおまかせ。あなたの希望を伝えるだけで、オリジナルの旅行プランを数秒で作成します。
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button asChild size="lg" className="text-lg">
            <Link href="/ai-planner">
              今すぐ無料でプランを作成
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AIPlannerHero;