"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import {
  modalContentVariants,
  modalOverlayVariants,
} from "@/components/animation";
import { Photo, Post } from "@/types/types";
import { gallery } from "@/data/gallery";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";

// 7分類フィルター
const filterList = [
  "すべて",
  "自然",
  "寺院・神社・城・王宮・慰霊碑",
  "都市・街並み・祭り・市場・広場",
  "タワー・美術館・聖堂・建築・闘牛場・教会",
  "グルメ・スイーツ",
  "空港・公共交通・商業施設",
];

// カテゴリ→分類変換
function getFilterCategory(category: string): string {
  if (["自然"].includes(category)) return "自然";
  if (["寺院", "神社", "城", "王宮", "慰霊碑"].includes(category))
    return "寺院・神社・城・王宮・慰霊碑";
  if (["街並み", "都市", "祭り", "市場", "広場"].includes(category))
    return "都市・街並み・祭り・市場・広場";
  if (["タワー", "美術館", "聖堂", "建築", "闘牛場", "教会"].includes(category))
    return "タワー・美術館・聖堂・建築・闘牛場・教会";
  if (["グルメ", "スイーツ"].includes(category)) return "グルメ・スイーツ";
  if (["空港", "公共交通", "商業施設"].includes(category))
    return "空港・公共交通・商業施設";
  return "その他";
}

interface ClientProps {
  posts: Post[];
}

const Client = ({ posts }: ClientProps) => {
  const [activeFilter, setActiveFilter] = useState("すべて");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [postSlug, setPostSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // filteredPhotosが変わるたびローディング
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // 0.8秒だけローディング
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // モーダル表示時に背景のスクロールを禁止する
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    // コンポーネントがアンマウントされた際にもスクロールを有効に戻す
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [selectedPhoto]);

  // idが未定義の写真にはuuidでidを付与
  // idが未定義の写真にはuuidでidを付与
  const galleryWithId = useMemo(
    // 関数の戻り値の型を明示的に指定
    (): Photo[] =>
      gallery.map((photo) => ({
        ...photo,
        // photo.id へのアクセスを削除し、直接新しいIDを付与する
        id: uuidv4(),
      })),
    []
  );

  const filteredPhotos = useMemo(
    () =>
      activeFilter === "すべて"
        ? galleryWithId
        : galleryWithId.filter(
            (p) => getFilterCategory(p.category) === activeFilter
          ),
    [activeFilter, galleryWithId]
  );

  const handleSelectPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    const foundPostByImage = posts.find((post) => post.image === photo.image);
    const foundPostByTitle = posts.find((post) =>
      post.title.includes(photo.title)
    );
    const foundPostByContent = posts.find((post) =>
      post.content.includes(photo.title)
    );
    if (foundPostByImage) {
      setPostSlug(`/posts/${foundPostByImage.slug}`);
    } else if (foundPostByTitle) {
      setPostSlug(`/posts/${foundPostByTitle?.slug}`);
    } else if (foundPostByContent) {
      setPostSlug(`/posts/${foundPostByContent?.slug}`);
    } else {
      setPostSlug(null);
    }
  };

  const handleNext = () => {
    if (selectedPhoto) {
      const currentIndex = filteredPhotos.findIndex(
        (p) => p.id === selectedPhoto.id
      );
      const nextIndex = (currentIndex + 1) % filteredPhotos.length;
      setSelectedPhoto(filteredPhotos[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (selectedPhoto) {
      const currentIndex = filteredPhotos.findIndex(
        (p) => p.id === selectedPhoto.id
      );
      const prevIndex =
        (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      setSelectedPhoto(filteredPhotos[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ==================== Hero Section ==================== */}
      <HeroSection
        src="/images/Turkey/balloons-in-cappadocia.jpg"
        alt="Gallery Hero Image"
        pageTitle="Gallery"
        pageMessage="A Glimpse of My Journey"
        textColor="text-foreground"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ==================== Filters ==================== */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {filterList.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                activeFilter === filter
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {activeFilter === filter ? filter : filter.split("・")[0]}
            </button>
          ))}
        </div>

        {/* ==================== Photo Grid (Masonry Layout) ==================== */}
        <motion.div
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-4"
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="mb-4 break-inside-avoid-column bg-gray-200 animate-pulse rounded-lg w-full h-48"
                />
              ))
            : filteredPhotos.map((photo) => (
                <motion.div
                  layout
                  key={photo.id}
                  onClick={() => handleSelectPhoto(photo)}
                  className="mb-4 break-inside-avoid-column cursor-pointer group"
                >
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-auto"
                  />
                </motion.div>
              ))}
        </motion.div>
      </div>

      {/* ==================== Modal (Popup) ==================== */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            key="modal-overlay"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            {/* Photo Counter */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-black/50 text-white text-sm rounded-full px-3 py-1">
                {filteredPhotos.findIndex((p) => p.id === selectedPhoto.id) + 1}{" "}
                / {filteredPhotos.length}
              </div>
            </div>

            <motion.div
              key="modal-content"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white text-black rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col md:flex-row overflow-y-auto md:overflow-y-hidden"
            >
              {/* Image Display */}
              <div className="w-full md:w-2/3 h-64 md:h-auto flex items-center justify-center bg-black">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  width={1600}
                  height={1200}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Details Section */}
              <div className="w-full md:w-1/3 p-6 flex flex-col">
                <span className="text-muted-foreground mb-2 text-sm">
                  <MapPin className="inline-block mr-2 text-teal-600" />
                  {selectedPhoto.location}
                </span>
                <h2 className="text-2xl font-bold mb-2">
                  {selectedPhoto.title}
                </h2>

                {/* Description with scroll */}
                <div className="flex-grow overflow-y-auto mb-4">
                  <p className="text-gray-600">{selectedPhoto.description}</p>
                </div>

                {/* Related Article Link */}
                {postSlug && (
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <Link
                      href={postSlug}
                      className="group inline-flex items-center text-teal-600 font-semibold"
                    >
                      この写真に関連する記事を読む
                      <ArrowRight
                        className="inline-block ml-2 transition-transform group-hover:translate-x-1"
                        size={18}
                      />
                    </Link>
                  </div>
                )}
              </div>

              {/* Controls */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/75"
              >
                <X size={24} />
              </button>
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/75"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/75"
                  >
                    <ArrowRight size={24} />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Client;
