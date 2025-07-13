"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { regions } from "@/data/regions";

const homeImages = [
    "/images/India/tajmahal.jpg",
    "/images/France/eiffel-tower-and-sunset.jpg",
    "/images/Spain/toledo-view.jpg",
    "/images/Thai/emotional-wat-arun.jpg",
    "/images/France/louvre-museum1.jpg",
    "/images/Spain/sagrada-familia.jpg",
];

interface SlideProps {
    showControls?: boolean;
    showIndicators?: boolean;
    imageType?: string;
}

const Slide = ({
    showControls = true,
    showIndicators = true,
    imageType = '',
}: SlideProps) => {
    const [current, setCurrent] = useState(0);
    const images = imageType
        ? regions.filter(r => r.city === imageType).flatMap(r => r.images)
        : homeImages;
    const total = images.length;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 8000); // 8秒ごとに自動切り替え
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, total]);

    const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);
    const nextSlide = () => setCurrent((prev) => (prev + 1) % total);

    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEndX(null); // 新しいタッチのためにリセット
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStartX === null || touchEndX === null) return;

        const distance = touchStartX - touchEndX;

        if (distance > minSwipeDistance) {
            nextSlide();
        } else if (distance < -minSwipeDistance) {
            prevSlide();
        }

        setTouchStartX(null);
        setTouchEndX(null);
    };


    return (
        <div
            className="absolute inset-0 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {images.map((img, idx) => (
                <Image
                    key={img}
                    src={img}
                    alt=""
                    fill
                    style={{ objectFit: "cover", transition: "opacity 0.8s" }}
                    priority={idx === 0}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                    idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                />
            ))}
            <div className="absolute inset-0 bg-black/40" />
            {/* スライド操作ボタン */}
            {showControls && (
                <>
                    <button
                        onClick={prevSlide}
                        aria-label="前へ"
                        className="hidden md:block absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-white/80 hover:text-black shadow-lg transition-colors"
                    >
                        <FaChevronLeft size={28} />
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="次へ"
                        className="hidden md:block absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-white/80 hover:text-black shadow-lg transition-colors"
                    >
                        <FaChevronRight size={28} />
                    </button>
                </>
            )}
            {/* インジケーター */}
            {showIndicators && (
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`block h-2 w-2 rounded-full transition-colors duration-300 ${
                                idx === current ? "bg-white" : "bg-white/50"
                            }`}
                        ></span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Slide;
