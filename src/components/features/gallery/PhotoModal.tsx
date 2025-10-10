"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { modal } from "@/components/common/animation";
import { Photo } from "@/types/types";
import { getRegionBySlug } from "@/lib/regionUtil";

interface PhotoModalProps {
  selectedPhoto: Photo | null;
  postSlug: string | null;
  photoCount: number;
  photoIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const PhotoModal = ({
  selectedPhoto,
  postSlug,
  photoCount,
  photoIndex,
  onClose,
  onNext,
  onPrev,
}: PhotoModalProps) => {
  let location;
  if (selectedPhoto) location = getRegionBySlug(selectedPhoto.location);
  return (
    <AnimatePresence>
      {selectedPhoto && (
        <motion.div
          key="modal-overlay"
          variants={modal.overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          {/* Photo Counter */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black/50 text-white text-sm rounded-full px-3 py-1">
              {photoIndex + 1} / {photoCount}
            </div>
          </div>

          <motion.div
            key="modal-content"
            variants={modal.content}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white text-black rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col md:flex-row overflow-y-auto md:overflow-y-hidden"
          >
            {/* Image Display */}
            <div className="w-full md:w-2/3 h-64 md:h-auto flex items-center justify-center bg-black">
              <Image
                src={selectedPhoto.path}
                alt={selectedPhoto.title}
                width={1600}
                height={1200}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/3 p-6 flex flex-col">
              {location && (
                <span className="text-muted-foreground mb-2 text-sm">
                  <MapPin className="inline-block mr-2 text-teal-600" />
                  {location.name}
                </span>
              )}
              <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>

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
              onClick={onClose}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/75"
            >
              <X size={24} />
            </button>
            {photoCount > 1 && (
              <>
                <button
                  onClick={onPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/75"
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  onClick={onNext}
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
  );
};

export default PhotoModal;
