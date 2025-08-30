import { Post } from "../types/types"; // Post型をインポート

export function getDatePrefix(postCategory: Post["category"]): string {
  switch (postCategory) {
    case "itinerary":
      return "旅行日：";
    case "tourism":
      return "更新日：";
    case "series":
      return "公開日";
    default:
      return "公開日";
  }
}
