import { Post } from "@/types/types";

type PostMetadata = Omit<Post, "content">;

// 検索ロジックを定義
export const filterPostsBySearch = (
  posts: PostMetadata[],
  query: string
): PostMetadata[] => {
  if (!query) {
    return posts;
  }

  // Helper to escape regex special characters
  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // 1. Parse query
  let remainingQuery = query;

  // Phrases
  const phrases = (remainingQuery.match(/"[^"]+"/g) || []).map((p) =>
    p.slice(1, -1)
  );
  remainingQuery = remainingQuery.replace(/"[^"]+"/g, "").trim();

  // NOT terms
  const notTerms =
    (remainingQuery.match(/-\S+/g) || []).map((t) => t.slice(1)) || [];
  remainingQuery = remainingQuery.replace(/-\S+/g, "").trim();

  // OR groups (split by OR, then by space for AND terms)
  const orGroups = remainingQuery
    .split(/\s+OR\s+/i)
    .map((group) => group.trim().split(/\s+/).filter(Boolean))
    .filter((group) => group.length > 0);

  return posts.filter((post) => {
    const searchableFields = [
      post.title,
      post.excerpt,
      post.category,
      post.location,
      post.author,
      post.series,
      post.tags,
    ]
      .flat()
      .filter((value): value is string => typeof value === "string")
      .map((value) => value.toLowerCase());

    const checkMatch = (term: string) => {
      const lowerTerm = term.toLowerCase();
      if (lowerTerm.includes("*")) {
        const regex = new RegExp(
          escapeRegExp(lowerTerm).replace(/\\\*/g, ".*"),
          "i"
        );
        return searchableFields.some((field) => regex.test(field));
      }
      return searchableFields.some((field) => field.includes(lowerTerm));
    };

    // 2. Filter logic
    // NOT condition: must not match any
    if (notTerms.some(checkMatch)) {
      return false;
    }

    // Phrase condition: must match all
    if (!phrases.every(checkMatch)) {
      return false;
    }

    // AND/OR conditions
    if (orGroups.length > 0) {
      // Must match at least one OR group
      // Each OR group must match all its AND terms
      const match = orGroups.some((andTerms) => andTerms.every(checkMatch));
      if (!match) {
        return false;
      }
    }

    return true;
  });
};

// スコアリングロジックを定義
export const calculateScores = (
  posts: PostMetadata[],
  query: string,
  weights?: Partial<Record<keyof PostMetadata, number>>,
  searchableKeys?: (keyof PostMetadata)[]
): { post: PostMetadata; score: number }[] => {
  if (!query) {
    return posts.map((post) => ({ post, score: 0 }));
  }

  const finalWeights = {
    title: 10,
    excerpt: 5,
    category: 3,
    location: 3,
    author: 3,
    series: 3,
    tags: 3,
    ...weights,
  };

  const finalSearchableKeys = searchableKeys || [
    "title",
    "excerpt",
    "category",
    "location",
    "author",
    "series",
    "tags",
  ];

  // Helper to escape regex special characters
  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // 1. Parse query (same as filterPostsBySearch)
  let remainingQuery = query.toLowerCase();

  // Phrases
  const phrases = (remainingQuery.match(/"[^"]+"/g) || []).map((p) =>
    p.slice(1, -1)
  );
  remainingQuery = remainingQuery.replace(/"[^"]+"/g, "").trim();

  // NOT terms are ignored for scoring as they are for filtering
  remainingQuery = remainingQuery.replace(/-\S+/g, "").trim();

  // OR groups
  const orGroups = remainingQuery
    .split(/\s+OR\s+/i)
    .map((group) => group.trim().split(/\s+/).filter(Boolean))
    .filter((group) => group.length > 0);

  const allTerms = orGroups.flat();

  const calculateTermFrequency = (text: string, term: string): number => {
    if (!text || !term) return 0;
    const lowerText = text.toLowerCase();
    const lowerTerm = term.toLowerCase();
    const escapedTerm = escapeRegExp(lowerTerm);
    const regex = new RegExp(escapedTerm, "g");
    return (lowerText.match(regex) || []).length;
  };

  return posts.map((post) => {
    let score = 0;

    const searchableFields: Record<string, string> = {};
    finalSearchableKeys.forEach((key) => {
      const value = post[key];
      if (Array.isArray(value)) {
        searchableFields[key as string] = value.join(" ");
      } else if (typeof value === "string") {
        searchableFields[key as string] = value;
      }
    });

    const processTerms = (terms: string[], multiplier = 1) => {
      terms.forEach((term) => {
        for (const key of finalSearchableKeys) {
          const weight = finalWeights[key as keyof typeof finalWeights] || 0;
          const fieldValue = searchableFields[key as string];
          if (fieldValue) {
            const tf = calculateTermFrequency(fieldValue, term);
            score += tf * weight * multiplier;
          }
        }
      });
    };

    // Score based on individual terms
    processTerms(allTerms);

    // Score based on phrases with a bonus multiplier
    processTerms(phrases, 2); // Phrases get double weight

    return { post, score };
  });
};
