"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Photo } from "@/types/types";

interface PhotoGridProps {
  isLoading: boolean;
  photos: Photo[];
  onSelectPhoto: (photo: Photo) => void;
}

const PhotoGrid = ({ isLoading, photos, onSelectPhoto }: PhotoGridProps) => {
  return (
    <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {isLoading
        ? Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid-column bg-gray-200 animate-pulse rounded-lg w-full h-48"
            />
          ))
        : photos.map((photo) => (
            <motion.div
              layout
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
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
  );
};

export default PhotoGrid;
