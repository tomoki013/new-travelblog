import { Post } from "@/types/types";

export interface createCustomHeadingProps {
    level: number; // 見出しのレベル (2ならh2, 3ならh3)
}

export interface CustomImgProps {
    src: string;
    alt: string;
}

export interface CustomLinkProps {
    href: string;
    children: React.ReactNode;
    allPosts: Post[];
    currentPostType: string;
}
