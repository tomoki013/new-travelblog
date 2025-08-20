export type PostType = "diary" | "tourism" | "itinerary" | "series";
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

// 地域別ページ用の地域の型
export interface regionProps {
  city: string;
  images: string[];
  country: string;
  title: string;
  description: string;
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
