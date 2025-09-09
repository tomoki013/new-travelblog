"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// 変更点 1: Gridモジュールを削除し、Autoplayのみインポート
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// 変更点 2: Grid用のCSSインポートを削除
import "swiper/css";
import Button from "../elements/Button";

import { sectionVariants } from "../animation";
import { shuffleArray } from "@/lib/shuffleArray";

const photos = [
  { path: "/images/Belgium/chez-leon-carbonade.jpg", title: "カルボナード" },
  {
    path: "/images/Belgium/galeries-royales-saint-hubert.jpg",
    title: "ギャルリ・サン・テュベール",
  },
  { path: "/images/Egypt/abusimbel-temple.jpg", title: "アブシンベル神殿" },
  {
    path: "/images/Egypt/the-three-great-pyramids-of-giza-with-sunset.jpg",
    title: "ギザの三大ピラミッドと夕陽",
  },
  {
    path: "/images/France/arc-de-triomphe-etoile.jpg",
    title: "エトワール凱旋門",
  },
  {
    path: "/images/France/bonaparte-over-the-saint-bernard-pass.jpg",
    title: "ナポレオンの絵",
  },
  {
    path: "/images/France/carrette-macarons-and-chocolate-mousse.jpg",
    title: "カフェ-カレット",
  },
  {
    path: "/images/France/eiffel-tower-and-sunset.jpg",
    title: "夕陽とエッフェル塔",
  },
  {
    path: "/images/France/escargot-at-le-vieux-bistrot.jpg",
    title: "エスカルゴ",
  },
  { path: "/images/France/louvre-museum1.jpg", title: "ルーブル美術館" },
  { path: "/images/France/mona-lisa.jpg", title: "モナリザ" },
  {
    path: "/images/France/the-hall-of-mirrors.jpg",
    title: "ヴェルサイユ宮殿・鏡の間",
  },
  { path: "/images/Greece/oia-castle-sunset-view.jpg", title: "イアの夕陽" },
  { path: "/images/Greece/oia-castle-view.jpg", title: "イア城跡からの景色" },
  { path: "/images/Greece/parthenon.jpg", title: "パルテノン神殿" },
  { path: "/images/India/hawa-mahal.jpg", title: "ハワー・マハル" },
  { path: "/images/India/indian-curry1.jpg", title: "インドカレー" },
  { path: "/images/India/lotus-temple.jpg", title: "ロータス寺院" },
  { path: "/images/India/tajmahal.jpg", title: "タージ・マハル" },
  {
    path: "/images/India/train-view1.jpg",
    title: "インドの寝台列車からの景色",
  },
  {
    path: "/images/Kyoto/kiyomizu-temple-autumn-leaves-lightup.jpg",
    title: "清水寺の紅葉ライトアップ",
  },
  {
    path: "/images/Spain/casa-lolea's-dry-cured-ham.jpg",
    title: "パ・アンブ・トマケ",
  },
  {
    path: "/images/Spain/la-pallaresa's-churos-con-chocolatte.jpg",
    title: "チュロス・コン・チョコラテ",
  },
  { path: "/images/Spain/plaza-de-mayor.jpg", title: "マヨール広場" },
  { path: "/images/Spain/sagrada-familia.jpg", title: "サグラダ・ファミリア" },
  { path: "/images/Spain/toledo-view.jpg", title: "トレド旧市街の絶景" },
  {
    path: "/images/Thai/ceiling-at-wat-pak-nam.jpg",
    title: "ワット・パクナムの仏塔",
  },
  { path: "/images/Thai/tom-yum-goong.jpg", title: "トムヤムクン" },
  {
    path: "/images/Thai/wat-arun-right-up.jpg",
    title: "ライトアップされたワット・アルン",
  },
  {
    path: "/images/Thai/wat-arun-with-sunset.jpg",
    title: "夕陽とワット・アルン",
  },
  {
    path: "/images/Turkey/balloons-in-cappadocia.jpg",
    title: "balloons in cappadocia",
  },
];

const Gallery = () => {
  const shuffledPhoto = shuffleArray(photos);
  // 変更点 3: ギャラリーデータを上段用（偶数インデックス）と下段用（奇数インデックス）に分割
  const topRowGallery = shuffledPhoto.filter((_, index) => index % 2 === 0);
  const bottomRowGallery = shuffledPhoto.filter((_, index) => index % 2 !== 0);

  return (
    <motion.section
      id="gallery"
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
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
            <SwiperSlide key={item.path}>
              <motion.div
                className="overflow-hidden rounded-md h-full"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={item.path}
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
            <SwiperSlide key={item.path}>
              <motion.div
                className="overflow-hidden rounded-md h-full"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={item.path}
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
      <Button href={`/gallery`}>ギャラリーをもっと見る</Button>
    </motion.section>
  );
};

export default Gallery;
