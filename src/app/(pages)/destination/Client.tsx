"use client";

import AllDestination from "@/components/featured/destination/allDestination";
import WorldMap from "@/components/featured/worldMap/WorldMap";
import Destination from "@/components/sections/Destination";
import { AllDestinationProps } from "@/types/types";
import Image from "next/image";

const Client = ({ regionData }: AllDestinationProps) => {
  // すべての国名を小文字の配列として抽出
  const allCountryNames = regionData.flatMap((continent) =>
    continent.countries.map((country) => country.slug)
  );
  return (
    <div>
      <section className="relative h-[85vh] flex flex-col md:flex-row items-center justify-center text-center text-white">
        <Image
          src={`/images/Turkey/balloons-in-cappadocia.jpg`}
          alt="Man looking at a globe"
          fill
          className="object-cover -z-10"
          priority
        />
        <div className="absolute inset-0 bg-black/35 -z-10" />
        <div className="max-w-4xl px-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            DESTINATIONS
          </h1>
          <p className="text-md md:text-lg mt-4 max-w-2xl">
            世界地図から、旅先を探す
          </p>
        </div>
        <div className="w-full h-auto mx-auto">
          <WorldMap highlightedRegions={allCountryNames} isClickable={false} />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* ==================== インタラクティブな世界地図 ==================== */}
        <Destination />

        {/* ==================== 地域別リスト ==================== */}
        <AllDestination
          regionData={regionData}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          countryStyle="border-b-2 border-secondary"
        />
      </div>
    </div>
  );
};

export default Client;
