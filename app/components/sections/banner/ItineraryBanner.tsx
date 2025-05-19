"use client";

import { ChevronRight, ChevronUp, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const ItineraryBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    const pathname = usePathname();
    const isItinerary = pathname.startsWith("/itinerary");
    const isBlog = pathname.startsWith("/diary/") || pathname.startsWith("/tourism/");

    if (isItinerary || isBlog) {
        return null; // 旅程＆費用レポートページ、ブログページでは表示しない
    }

    return (
        <>
            {isVisible ? (
                <div
                    className="bg-gray-900 text-white py-4 fixed bottom-0 left-0 right-0 x-10 z-10"
                    style ={{
                        backgroundImage: "url('/images/Thai/wat-arun-4.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-lg font-bold">旅程＆費用レポート公開中！</p>
                                <p className="text-sm text-gray-300 mt-1">実際の旅行日程とかかった費用を公開しています。</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={"/itinerary"}
                                    className="flex items-center bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full transition-all group"
                                >
                                    <span>詳細を見る</span>
                                    <ChevronRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-all group" />
                                </Link>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="fixed bottom-4 right-4 bg-gray-900/80 text-white p-3 rounded-lg shadow-lg hover:bg-gray-800/90 transition-all flex items-center space-x-2 cursor-pointer z-10"
                    style={{
                        backgroundImage: "url('/images/Thai/wat-arun-4.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                    onClick={() => setIsVisible(true)}
                >
                    <ChevronUp className="w-5 h-5" />
                    <span className="text-sm">旅程＆費用レポート</span>
                </div>
            )}
        </>
    )
}

export default ItineraryBanner;
