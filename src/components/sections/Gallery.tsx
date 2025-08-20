"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gallery } from "@/data/gallery";

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 px-6 md:px-8 max-w-6xl mx-auto">
      {/* セクションタイトル */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          Gallery
        </h2>
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6" />
      </div>

      {/* 画像グリッド */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {gallery.slice(0, 4).map((image) => (
          <motion.div
            key={image.image}
            className="overflow-hidden rounded-md cursor-pointer"
            // ホバー時のアニメーション
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Image
              src={image.image}
              alt={image.title}
              width={400}
              height={300}
              className="w-full h-48 md:h-64 object-cover transition-all duration-300 ease-in-out hover:brightness-110"
            />
          </motion.div>
        ))}
      </div>

      {/* ボタン */}
      <div className="text-center">
        <Link
          href={`/gallery`}
          className="inline-block py-3 px-10 bg-secondary text-white uppercase text-sm font-bold tracking-wider rounded-full border-2 border-secondary transition-all duration-300 ease-in-out hover:bg-transparent hover:text-secondary"
        >
          ギャラリーをもっと見る
        </Link>
      </div>
    </section>
  );
};

export default Gallery;
