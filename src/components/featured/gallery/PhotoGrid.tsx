"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Photo } from "@/types/types";

interface PhotoGridProps {
  photos: Photo[];
  onSelectPhoto: (photo: Photo) => void;
}

const PhotoGrid = ({ photos, onSelectPhoto }: PhotoGridProps) => {
  return (
    <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4">
      <AnimatePresence>
        {photos.map((photo) => (
          <motion.div
            layout
            key={photo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
      </AnimatePresence>
    </motion.div>
  );
};

export default PhotoGrid;
