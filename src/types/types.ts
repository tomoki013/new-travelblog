export type PostType = "tourism" | "itinerary" | "series";
export interface Post {
  id: string;
  slug: string;
  title: string;
  dates: string[];
  content: string;
  excerpt: string;
  image: string;
  category: string[];
  location: string[];
  author: string;
  tags: string[];
  budget?: number;
  costs?: Record<string, number>;
  type: PostType;
  series?: string;
}

export interface Photo {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  category: string;
  likes?: number;
}

export interface Author {
  name: string;
  role: string;
  description: string;
  image: string;
}

// --- ここから ---

/**
 * 国または都市を表す型。
 * 都市を持つ国の場合、'children'プロパティに都市の配列が含まれます。
 * 以前の `parent` プロパティを持つフラットな構造と、
 * 新しい `children` を持つネスト構造の両方に対応するため、
 * 両方のプロパティをオプショナルで含めています。
 */
export interface Region {
  slug: string;
  name: string;
  imageURL: string;
  children?: Region[]; // 新しい構造のため（任意）
}

export interface ContinentData {
  slug: string;
  name: string;
  countries: Array<{
    slug: string;
    name: string;
    imageURL: string;
    children?: Array<{ slug: string; name: string; imageURL: string }>;
  }>;
}

// Seriesデータの型定義
export interface Series {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  IconComponent: string;
}

export interface AllDestinationProps {
  regionsData: ContinentData[];
}
