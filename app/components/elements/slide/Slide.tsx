"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
    "/images/India/tajmahal.jpg",
    "/images/France/eiffel-tower-and-sunset.jpg",
    "/images/Spain/toledo-view.jpg",
    "/images/Thai/wat-arun-4.jpg",
    "/images/France/louvre-museum1.jpg",
    "/images/Spain/sagrada-familia.jpg",
    // 必要に応じて画像パスを追加
];

const Slide = () => {
    const [current, setCurrent] = useState(0);
    const total = images.length;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 自動スライド
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 8000); // 4秒ごとに自動切り替え
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, total]);

    const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);
    const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
    return (
        <div className="absolute inset-0 overflow-hidden">
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
            <button
                onClick={prevSlide}
                aria-label="前へ"
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-white/80 hover:text-black shadow-lg transition-colors"
            >
                <FaChevronLeft size={28} />
            </button>
            <button
                onClick={nextSlide}
                aria-label="次へ"
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-white/80 hover:text-black shadow-lg transition-colors"
            >
                <FaChevronRight size={28} />
            </button>
            {/* インジケーター */}
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
        </div>
    )
}

export default Slide;
