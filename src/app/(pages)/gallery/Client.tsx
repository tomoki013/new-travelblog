"use client";

import { useState, useMemo, useEffect } from "react";
import { Photo, Post } from "@/types/types";
type PostMetadata = Omit<Post, "content">;
import { gallery } from "@/data/gallery";
import { v4 as uuidv4 } from "uuid";
import HeroSection from "@/components/sections/HeroSection";
import PhotoFilter from "@/components/featured/gallery/PhotoFilter";
import PhotoGrid from "@/components/featured/gallery/PhotoGrid";
import PhotoModal from "@/components/featured/gallery/PhotoModal";

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
  posts: PostMetadata[];
}

const Client = ({ posts }: ClientProps) => {
  const [activeFilter, setActiveFilter] = useState("すべて");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [postSlug, setPostSlug] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [selectedPhoto]);

  const galleryWithId = useMemo(
    (): Photo[] =>
      gallery.map((photo) => ({
        ...photo,
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
    if (foundPostByImage) {
      setPostSlug(`/posts/${foundPostByImage.slug}`);
    } else if (foundPostByTitle) {
      setPostSlug(`/posts/${foundPostByTitle?.slug}`);
    } else {
      setPostSlug(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleNext = () => {
    if (selectedPhoto) {
      const currentIndex = filteredPhotos.findIndex(
        (p) => p.id === selectedPhoto.id
      );
      const nextIndex = (currentIndex + 1) % filteredPhotos.length;
      handleSelectPhoto(filteredPhotos[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (selectedPhoto) {
      const currentIndex = filteredPhotos.findIndex(
        (p) => p.id === selectedPhoto.id
      );
      const prevIndex =
        (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      handleSelectPhoto(filteredPhotos[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        src="/images/Turkey/balloons-in-cappadocia.jpg"
        alt="Gallery Hero Image"
        pageTitle="Gallery"
        pageMessage="A Glimpse of My Journey"
        textColor="text-foreground"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PhotoFilter
          filterList={filterList}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <PhotoGrid photos={filteredPhotos} onSelectPhoto={handleSelectPhoto} />
      </div>

      <PhotoModal
        selectedPhoto={selectedPhoto}
        postSlug={postSlug}
        photoCount={filteredPhotos.length}
        photoIndex={
          selectedPhoto
            ? filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
            : -1
        }
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default Client;
