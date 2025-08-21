import { Region } from "@/types/types";

export const allRegions: Region[] = [
  // 国
  { slug: "jp", name: "日本" },
  { slug: "kr", name: "韓国" },
  { slug: "fr", name: "フランス" },
  { slug: "in", name: "インド" },
  { slug: "es", name: "スペイン" },
  { slug: "be", name: "ベルギー" },
  { slug: "th", name: "タイ" },
  { slug: "vn", name: "ベトナム" },
  { slug: "eg", name: "エジプト" },
  { slug: "gr", name: "ギリシャ" },
  { slug: "tr", name: "トルコ" },

  // 都市（親を指定）
  // 日本
  { slug: "kyoto", name: "京都", parent: "jp" },
  { slug: "osaka", name: "大阪", parent: "jp" },
  { slug: "hokkaido", name: "北海道", parent: "jp" },

  // 韓国
  { slug: "soul", name: "ソウル", parent: "kr" },

  // フランス
  { slug: "paris", name: "パリ", parent: "fr" },

  // インド
  { slug: "new-delhi", name: "ニューデリー", parent: "in" },
  { slug: "agra", name: "アグラ", parent: "in" },
  { slug: "jaipur", name: "ジャイプル", parent: "in" },
  { slug: "varanasi", name: "バラナシ", parent: "in" },

  // スペイン
  { slug: "barcelona", name: "バルセロナ", parent: "es" },
  { slug: "madrid", name: "マドリード", parent: "es" },
  { slug: "toledo", name: "トレド", parent: "es" },

  // ベルギー
  { slug: "brussels", name: "ブリュッセル", parent: "be" },

  // タイ
  { slug: "bangkok", name: "バンコク", parent: "th" },

  // ベトナム
  { slug: "hanoi", name: "ハノイ", parent: "vn" },

  // エジプト
  { slug: "giza", name: "ギザ", parent: "eg" },
  { slug: "abu-simbel", name: "アブシンベル", parent: "eg" },
  { slug: "aswan", name: "アスワン", parent: "eg" },

  // ギリシャ
  { slug: "santorini", name: "サントリーニ", parent: "gr" },
  { slug: "athens", name: "アテネ", parent: "gr" },

  // トルコ
  { slug: "cappadocia", name: "カッパドキア", parent: "tr" },
];
