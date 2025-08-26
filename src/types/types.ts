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
  location:string[];
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

// --- Region Types ---

export interface City {
  slug: string;
  name: string;
  imageURL: string;
}

export interface Country {
  slug: string;
  name: string;
  imageURL: string;
  children?: City[];
}

export interface ContinentData {
  slug: string;
  name: string;
  countries: Country[];
}

export interface Region {
  slug: string;
  name: string;
  imageURL: string;
  children?: Region[];
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
  regionData: ContinentData[];
}
