"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  slideInUpVariants,
} from "@/components/animation";
import {
  Castle,
  Sunset,
  Landmark,
  Globe2,
  MountainSnow,
  type LucideProps,
} from "lucide-react";
import { Series } from "@/types/types";

// Icon map
const iconMap: { [key: string]: React.FC<LucideProps> } = {
  Castle,
  Sunset,
  Landmark,
  Globe2,
  MountainSnow,
};

interface SeriesCardProps {
    series: Series;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
    const IconComponent = iconMap[series.IconComponent];
    return (
        <Link href={`/series/${series.slug}`} key={series.id} passHref>
        <motion.div
          variants={slideInUpVariants}
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
            </div>
          </div>
        </motion.div>
      </Link>
    )
}

export default SeriesCard;
