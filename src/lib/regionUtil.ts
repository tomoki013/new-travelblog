import { regionsData } from "@/data/regions";
import { Region } from "@/types/types";

/**
 * すべての地域情報をフラットな配列で取得します。（キャッシュすることも可能）
 */
const getAllRegions = (): Region[] => {
  const allRegions: Region[] = [];
  regionsData.forEach((continent) => {
    continent.countries.forEach((country) => {
      allRegions.push({ ...country, children: undefined }); // 子要素は含めない
      if (country.children && country.children.length > 0) {
        allRegions.push(...country.children);
        console.log(allRegions);
      }
    });
  });
  return allRegions;
};

const allRegions = getAllRegions(); // 事前に全リージョンをキャッシュ
/**
 * slugから単一の地域情報を取得します。
 */
export const getRegionBySlug = (slug: string): Region | undefined => {
  return allRegions.find((region) => region.slug === slug);
};

// getRegionsBySlugsは、getRegionBySlugを内部で使うため、そのままでも機能しますが、
// パフォーマンスを考慮してMapを使うとより高速になります。
const regionMap = new Map(allRegions.map((region) => [region.slug, region]));
export const getRegionBySlugOptimized = (slug: string): Region | undefined => {
  return regionMap.get(slug);
};

/**
 * slugの配列を受け取り、存在する地域オブジェクトのみの配列を返します。
 * 内部で `undefined` は自動的に除外されます。
 * @param slugs - 地域slugの配列
 * @returns `Region`オブジェクトの配列（undefinedを含まない）
 */
export const getValidRegionsBySlugs = (slugs: string[]): Region[] => {
  return slugs
    .map((slug) => getRegionBySlugOptimized(slug)) // まずslugをRegion | undefinedに変換
    .filter((region): region is Region => region !== undefined); // 次にundefinedを取り除く
};

/**
 * slugから階層的な地域情報のパスを取得します。
 * データ構造がネストされているため、再帰的に探索することでより簡潔に記述できます。
 */
export const getRegionPath = (slug: string): Region[] => {
  const findPath = (targetSlug: string, regions: Region[]): Region[] | null => {
    for (const region of regions) {
      if (region.slug === targetSlug) {
        return [region];
      }
      if (region.children) {
        const path = findPath(targetSlug, region.children);
        if (path) {
          return [region, ...path];
        }
      }
    }
    return null;
  };

  let finalPath: Region[] = [];
  for (const continent of regionsData) {
    const path = findPath(slug, continent.countries);
    if (path) {
      finalPath = path;
      break;
    }
  }
  return finalPath;
};
