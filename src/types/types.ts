export interface PostMetadata {
  title: string;
  date: string;
  author: string;
  category: string;
  tags?: string[];
  location?: string | string[];
  description: string;
  slug: string;
  image?: string;
  thumbnail?: string;
}

export interface CityData {
    name: string;
    slug: string;
}

export interface CountryData {
    name: string;
    slug: string;
    children?: CityData[];
}

export interface ContinentData {
    name: string;
    countries: CountryData[];
}

export interface TravelPlan {
  itinerary: {
    title: string;
    description: string;
    totalBudget: number;
    days: {
      day: number;
      title: string;
      budget: number;
      schedule: {
        time: string;
        activity: string;
        details: string;
        cost: number;
        location: {
          name: string;
          latitude: number;
          longitude: number;
        };
      }[];
    }[];
  };
  budgetSummary: {
    total: number;
    categories: {
      category: string;
      amount: number;
    }[];
  };
}