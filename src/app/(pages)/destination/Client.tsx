"use client";

import AllDestination from "@/components/featured/destination/allDestination";
import Destination from "@/components/sections/Destination";
import { AllDestinationProps } from "@/types/types";

const Client = ({ regionData }: AllDestinationProps) => {
  return (
    <div>
      {/* ==================== Hero Section ==================== */}
      <section className="relative h-72 md:h-96 flex items-center justify-center text-white text-center">
        <div className="absolute inset-0 bg-secondary" />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            DESTINATIONS
          </h1>
          <p className="text-md md:text-lg mt-4 max-w-2xl">
            世界地図から、旅先を探す
          </p>
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
