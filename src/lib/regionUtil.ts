import { allRegions } from "@/data/regions";
import { Region } from "@/types/types";

/**
 * slugから単一の地域情報を取得します。
 */
export const getRegionBySlug = (slug: string): Region | undefined => {
  return allRegions.find((region) => region.slug === slug);
};

/**
 * slugの配列から、対応する地域情報の配列を取得します。
 */
export const getRegionsBySlugs = (slugs: string[]): Region[] => {
  const mappedRegions = slugs.map((slug) => getRegionBySlug(slug));

  const filteredRegions = mappedRegions.filter(
    (region): region is Region => region !== undefined
  );

  return filteredRegions;
};

/**
 * slugから階層的な地域情報のパスを取得します。
 * 配列は親から子へ（例: [日本, 京都]）の順序で返されます。
 * @param slug - 最下層の地域のslug (例: "kyoto")
 * @returns 親から子への順序で並んだRegionオブジェクトの配列
 */
export const getRegionPath = (slug: string): Region[] => {
  const path: Region[] = [];
  let currentSlug: string | undefined = slug;

  while (currentSlug) {
    const region = getRegionBySlug(currentSlug);
    if (region) {
      path.unshift(region);
      currentSlug = region.parent;
    } else {
      break;
    }
  }
  return path;
};
