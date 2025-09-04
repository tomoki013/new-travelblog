"use client";

import { useState, useMemo, useEffect } from "react";
import { Photo, Post } from "@/types/types";
type PostMetadata = Omit<Post, "content">;
import HeroSection from "@/components/sections/HeroSection";
import PhotoFilter from "@/components/featured/gallery/PhotoFilter";
import PhotoGrid from "@/components/featured/gallery/PhotoGrid";
import PhotoModal from "@/components/featured/gallery/PhotoModal";
import { categoryMappings } from "@/data/photoCategories";

const filterList: string[] = ["すべて", ...Object.keys(categoryMappings)];

const categoryToFilterMap = new Map<string, string>();
for (const filterName in categoryMappings) {
  for (const category of categoryMappings[filterName]) {
    categoryToFilterMap.set(category, filterName);
  }
}

function getFilterCategory(category: string): string {
  return categoryToFilterMap.get(category) || "その他";
}

interface ClientProps {
  posts: PostMetadata[];
  photos: Photo[];
}

const Client = ({ posts, photos }: ClientProps) => {
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

  const filteredPhotos = useMemo(
    () =>
      activeFilter === "すべて"
        ? photos
        : photos.filter((p) =>
            p.categories.some(
              (category) => getFilterCategory(category) === activeFilter
            )
          ),
    [activeFilter, photos]
  );

  const handleSelectPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    const foundPostByImage = posts.find((post) => post.image === photo.path);
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
