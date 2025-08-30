export type PostType = "tourism" | "itinerary" | "series";
export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  type: string;
  // The following properties are now part of the frontmatter but not explicitly handled by the new API.
  // They can be accessed via `data` object from `matter(fileContents)`.
  // If they are needed, the new API functions must be updated to return them.
  id?: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  location?: string[];
  author?: string;
  budget?: number;
  costs?: Record<string, number>;
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
