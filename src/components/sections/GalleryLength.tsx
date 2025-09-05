"use client";

import { motion } from "framer-motion";
import { sectionVariants } from "@/components/animation";
import Button from "../elements/Button";
import { Photo } from "@/types/types";

interface GalleryLengthProps {
  photos: Photo[];
}

const GalleryLength = ({ photos }: GalleryLengthProps) => {
  const allGallery = photos;
  const galleryLength = allGallery.length;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      className="py-24 px-6 md:px-8 max-w-5xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          How many photos have I added?
        </h2>
        {/* タイトル下のアクセントライン */}
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6" />
      </div>
      <div className="text-center mt-8">
        <p className="text-xl md:text-2xl font-bold">
          <span className="text-3xl md:text-4xl text-primary font-extrabold">
            {galleryLength}
          </span>
        </p>
      </div>
      <Button href={`/gallery`}>写真ギャラリーへ</Button>
    </motion.section>
  );
};

export default GalleryLength;
