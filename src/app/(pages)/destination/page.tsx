import { allRegions } from "@/data/regions";
import Client from "./Client";
import { Region } from "@/types/types";

// 大陸ごとの国を定義（手動でのマッピング）
const continentMap: Record<string, string[]> = {
  Asia: ["jp", "kr", "th", "vn", "in"],
  Europe: ["fr", "es", "be", "gr", "tr", "it"], // itを追加
  Africa: ["eg"],
};

// 地域データを大陸ごとに整理するヘルパー関数
const groupRegionsByContinent = () => {
  const countries = allRegions.filter((r) => !r.parent);
  const cities = allRegions.filter((r) => r.parent);

  const grouped: Record<string, (Region & { children: Region[] })[]> = {};

  for (const continent in continentMap) {
    if (!grouped[continent]) grouped[continent] = [];

    continentMap[continent].forEach((countrySlug) => {
      const country = countries.find((c) => c.slug === countrySlug);
      if (country) {
        grouped[continent].push({
          ...country,
          // この国に属する都市を探す
          children: cities.filter((city) => city.parent === country.slug),
        });
      }
    });
  }
  return grouped;
};

export default async function DestinationPage() {
  const groupedRegions = groupRegionsByContinent();

  return <Client groupedRegions={groupedRegions} />;
}
