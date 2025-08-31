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
  query: string
): { post: PostMetadata; score: number }[] => {
  if (!query) {
    return posts.map((post) => ({ post, score: 0 }));
  }

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

  const weights = {
    title: 10,
    excerpt: 5,
    category: 3,
    location: 3,
    author: 3,
    series: 3,
    tags: 3,
  };

  const calculateTermFrequency = (text: string, term: string): number => {
    if (!text || !term) return 0;
    const lowerText = text.toLowerCase();
    const lowerTerm = term.toLowerCase();
    // Use a simple split and count for non-regex approach to avoid complexity with special chars in terms
    // This is generally safer and sufficient for whole word counting.
    // For more complex pattern matching (like wildcards), a regex approach would be needed.
    const escapedTerm = escapeRegExp(lowerTerm);
    const regex = new RegExp(escapedTerm, "g");
    return (lowerText.match(regex) || []).length;
  };

  return posts.map((post) => {
    let score = 0;

    const searchableFields = {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      location: post.location,
      author: post.author,
      series: post.series,
      tags: Array.isArray(post.tags) ? post.tags.join(" ") : post.tags,
    };

    const processTerms = (terms: string[], multiplier = 1) => {
      terms.forEach((term) => {
        for (const [field, weight] of Object.entries(weights)) {
          const fieldValue = searchableFields[field as keyof typeof searchableFields];
          if (typeof fieldValue === "string") {
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
