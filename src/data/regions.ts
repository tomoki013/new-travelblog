import { Region } from "@/types/types";

export const allRegions: Region[] = [
  // 国
  {
    slug: "jp",
    name: "日本",
    imageURL: "/images/Kyoto/kiyomizu-temple-autumn-leaves-lightup.jpg",
  },
  { slug: "kr", name: "韓国", imageURL: "/images/Korea/monument.jpg" },
  {
    slug: "fr",
    name: "フランス",
    imageURL: "/images/France/eiffel-tower-and-sunset.jpg",
  },
  { slug: "in", name: "インド", imageURL: "/images/India/tajmahal.jpg" },
  {
    slug: "es",
    name: "スペイン",
    imageURL: "/images/Spain/las-ventas-bullring.jpg",
  },
  {
    slug: "be",
    name: "ベルギー",
    imageURL: "/images/Belgium/galeries-royales-saint-hubert.jpg",
  },
  { slug: "th", name: "タイ", imageURL: "/images/Thai/emotional-wat-arun.jpg" },
  {
    slug: "vn",
    name: "ベトナム",
    imageURL: "/images/Vietnam/vietnam-old-town2.jpg",
  },
  {
    slug: "eg",
    name: "エジプト",
    imageURL: "/images/Egypt/the-three-great-pyramids-of-giza-with-sunset.jpg",
  },
  {
    slug: "gr",
    name: "ギリシャ",
    imageURL: "/images/Greece/oia-castle-sunset-view.jpg",
  },
  {
    slug: "tr",
    name: "トルコ",
    imageURL: "/images/Turkey/balloons-in-cappadocia.jpg",
  },

  // 都市（親を指定）
  // 日本
  {
    slug: "kyoto",
    name: "京都",
    parent: "jp",
    imageURL: "/images/Kyoto/kiyomizu-temple-autumn-leaves-lightup.jpg",
  },
  { slug: "osaka", name: "大阪", parent: "jp", imageURL: "/images/Osaka/" },
  {
    slug: "hokkaido",
    name: "北海道",
    parent: "jp",
    imageURL: "/images/Hokkaido/otaru-canal.jpg",
  },

  // 韓国
  {
    slug: "soul",
    name: "ソウル",
    parent: "kr",
    imageURL: "/images/Korea/monument.jpg",
  },

  // フランス
  {
    slug: "paris",
    name: "パリ",
    parent: "fr",
    imageURL: "/images/France/louvre-museum1.jpg",
  },

  // インド
  {
    slug: "new-delhi",
    name: "ニューデリー",
    parent: "in",
    imageURL: "/images/India/indian-gate-at-noon.jpg",
  },
  {
    slug: "agra",
    name: "アグラ",
    parent: "in",
    imageURL: "/images/India/tajmahal.jpg",
  },
  {
    slug: "jaipur",
    name: "ジャイプル",
    parent: "in",
    imageURL: "/images/India/hawa-mahal.jpg",
  },
  {
    slug: "varanasi",
    name: "バラナシ",
    parent: "in",
    imageURL: "/images/India/festival-of-ganga3.jpg",
  },

  // スペイン
  {
    slug: "barcelona",
    name: "バルセロナ",
    parent: "es",
    imageURL: "/images/Spain/sagrada-familia.jpg",
  },
  {
    slug: "madrid",
    name: "マドリード",
    parent: "es",
    imageURL: "/images/Spain/plaza-de-mayor.jpg",
  },
  {
    slug: "toledo",
    name: "トレド",
    parent: "es",
    imageURL: "/images/Spain/toledo-view.jpg",
  },

  // ベルギー
  {
    slug: "brussels",
    name: "ブリュッセル",
    parent: "be",
    imageURL: "/images/Belgium/galeries-royales-saint-hubert.jpg",
  },

  // タイ
  {
    slug: "bangkok",
    name: "バンコク",
    parent: "th",
    imageURL: "/images/Thai/ceiling-at-wat-pak-nam.jpg",
  },

  // ベトナム
  {
    slug: "hanoi",
    name: "ハノイ",
    parent: "vn",
    imageURL: "/images/Vietnam/vietnam-old-town2.jpg",
  },

  // エジプト
  {
    slug: "giza",
    name: "ギザ",
    parent: "eg",
    imageURL: "/images/Egypt/the-three-great-pyramids-of-giza-with-sunset.jpg",
  },
  {
    slug: "abu-simbel",
    name: "アブシンベル",
    parent: "eg",
    imageURL: "/images/Egypt/abusimbel-temple.jpg",
  },
  {
    slug: "aswan",
    name: "アスワン",
    parent: "eg",
    imageURL: "/images/Egypt/aswan-view.jpg",
  },

  // ギリシャ
  {
    slug: "santorini",
    name: "サントリーニ",
    parent: "gr",
    imageURL: "/images/Greece/santorini-view.jpg",
  },
  {
    slug: "athens",
    name: "アテネ",
    parent: "gr",
    imageURL: "/images/Greece/parthenon.jpg",
  },

  // トルコ
  {
    slug: "cappadocia",
    name: "カッパドキア",
    parent: "tr",
    imageURL: "/images/Turkey/balloons-in-cappadocia.jpg",
  },
];
