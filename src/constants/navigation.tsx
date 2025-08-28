import { FaGithub, FaTiktok, FaYoutube } from "react-icons/fa";

export const NAV_LINKS = [
  { href: "/destination", label: "Destination" },
  { href: "/series", label: "Series" },
  { href: "/posts", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export const FOOTER_CONTENTS_LIST = [
  { name: "地域別一覧", pass: "/destination" },
  { name: "シリーズ一覧", pass: "/series" },
  { name: "ブログ一覧", pass: "/posts" },
  { name: "写真ギャラリー", pass: "/gallery" },
];

export const FOOTER_LINK_LIST = [
  { name: "サイトについて", pass: "/about" },
  { name: "プライバシーポリシー", pass: "/privacy" },
  { name: "利用規約", pass: "/terms" },
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
