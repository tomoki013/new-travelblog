'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { regions } from "../../../../data/regions";

const FeaturedRegions = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 6;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? Math.ceil(regions.length / itemsPerPage) - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === Math.ceil(regions.length / itemsPerPage) - 1 ? 0 : prevIndex + 1
        );
    };

    const visibleRegions = regions.slice(
        currentIndex * itemsPerPage,
        currentIndex * itemsPerPage + itemsPerPage
    );

    return (
        <section className="my-16">
            <h2 className="mb-6 text-2xl font-bold">人気の観光地</h2>
            <div className="relative mx-11">
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrev}
                        className="absolute -left-11 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 h-10 w-10 hover:bg-black/70 transition-colors dark:bg-white/50 dark:text-bg-black dark:hover:bg-white/70 duration-300"
                    >
                        &#8592;
                    </button>
                )}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {visibleRegions.map((region) => (
                        <Link key={region.city} href={`/tourism/region/${region.city.toLowerCase()}`}>
                            <div className="group relative h-32 overflow-hidden rounded-lg">
                                <Image
                                    src={region.images[0]}
                                    alt={region.city}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/60" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">{region.city}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {currentIndex < Math.ceil(regions.length / itemsPerPage) - 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute -right-11 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 h-10 w-10 hover:bg-black/70 transition-colors dark:bg-white/50 dark:text-bg-black dark:hover:bg-white/70 duration-300"
                    >
                        &#8594;
                    </button>
                )}
            </div>
        </section>
    );
};

export default FeaturedRegions;
