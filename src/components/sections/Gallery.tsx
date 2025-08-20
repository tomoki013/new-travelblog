"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gallery } from "@/data/gallery";

// 変更点 1: Gridモジュールを削除し、Autoplayのみインポート
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// 変更点 2: Grid用のCSSインポートを削除
import "swiper/css";

const Gallery = () => {
  // 変更点 3: ギャラリーデータを上段用（偶数インデックス）と下段用（奇数インデックス）に分割
  const topRowGallery = gallery.filter((_, index) => index % 2 === 0);
  const bottomRowGallery = gallery.filter((_, index) => index % 2 !== 0);

  return (
    <section id="gallery" className="py-24">
      {/* セクションタイトル */}
      <div className="text-center mb-16 px-6 md:px-8">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          Gallery
        </h2>
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6" />
      </div>

      {/* スライダー全体の幅を制御するためのコンテナ */}
      {/* 変更点 4: 2つのスライダーを縦に並べるためのコンテナを追加 */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col space-y-6">
        {/* --- 上の段のスライダー (右から左へ) --- */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          // こちらは通常方向のまま
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            reverseDirection: true, // 右から左へスクロール
          }}
          speed={1500}
          slidesPerView={3}
          slidesPerGroup={3}
          spaceBetween={24}
          grabCursor={true}
          className="w-full h-[268px]"
          breakpoints={{
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 24,
            },
          }}
        >
          {topRowGallery.map((item) => (
            <SwiperSlide key={item.image}>
              <motion.div
                className="overflow-hidden rounded-md h-full"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- 下の段のスライダー (左から右へ) --- */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          // こちらは通常方向のまま
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1500}
          slidesPerView={3}
          slidesPerGroup={3}
          spaceBetween={24}
          grabCursor={true}
          className="w-full h-[268px]"
          breakpoints={{
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 24,
            },
          }}
        >
          {bottomRowGallery.map((item) => (
            <SwiperSlide key={item.image}>
              <motion.div
                className="overflow-hidden rounded-md h-full"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ボタン */}
      <div className="text-center mt-16">
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
