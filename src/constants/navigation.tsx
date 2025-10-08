import { FaGithub, FaTiktok, FaYoutube } from "react-icons/fa";

export interface NavLink {
  href: string;
  label: string;
  isNew?: boolean;
}

export interface FooterContent {
  name: string;
  pass: string;
  isNew?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  {
    href: "/ai-planner",
    label: "AI旅行プランナー",
    isNew: true,
  },
  { href: "/destination", label: "地域" },
  { href: "/series", label: "シリーズ" },
  { href: "/posts", label: "ブログ" },
  { href: "/gallery", label: "写真ギャラリー" },
  { href: "/about", label: "サイトについて" },
];

export const FOOTER_CONTENTS_LIST: FooterContent[] = [
  { name: "AI旅行プランナー", pass: "/ai-planner", isNew: true },
  { name: "地域別一覧", pass: "/destination" },
  { name: "シリーズ一覧", pass: "/series" },
  { name: "ブログ一覧", pass: "/posts" },
  { name: "写真ギャラリー", pass: "/gallery" },
];

export const FOOTER_LINK_LIST = [
  { name: "サイトについて", pass: "/about" },
  { name: "プライバシーポリシー", pass: "/privacy" },
  { name: "利用規約", pass: "/terms" },
  { name: "アフィリエイトポリシー", pass: "/affiliates" },
  { name: "サイトマップ", pass: "/sitemap" },
];

export const SOCIAL_LIST = [
  {
    name: "YouTube",
    pass: "https://www.youtube.com/@tomokichi_travel",
    icon: <FaYoutube />,
  },
  {
    name: "TikTok",
    pass: "https://www.tiktok.com/@tomokichitravel",
    icon: <FaTiktok />,
  },
  {
    name: "GitHub",
    pass: "https://github.com/tomoki013/new-travelblog",
    icon: <FaGithub />,
  },
];
