"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Series } from "@/types/types";

interface SeriesCardProps {
  series: Series;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
  return (
    // motion.divをLinkコンポーネントでラップ
    <Link href={series.slug} passHref>
      <motion.div
        className="relative flex flex-col justify-end h-96 p-6 rounded-md overflow-hidden text-white no-underline bg-cover bg-center"
        style={{ backgroundImage: `url(${series.imageUrl})` }}
        // ホバー時のアニメーションを指定
        whileHover={{ y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-colors duration-400 ease-in-out hover:from-black/80"></div>

        {/* テキストコンテンツ */}
        <div className="relative z-10">
          <h3 className="font-heading text-2xl font-bold mb-2">
            {series.title}
          </h3>
          <p className="font-body text-sm">{series.description}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default SeriesCard;
