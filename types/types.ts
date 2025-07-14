export interface Post {
    slug: string
    title: string
    dates: string[]
    content: string
    excerpt: string
    image: string
    category: string[]
    location: string[]
    author: string
    tags: string[]
    budget?: number
    costs?: Record<string, number>
    type: 'diary' | 'tourism' | 'itinerary'; // 投稿のタイプを追加
}

export interface Photo {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    category: string;
    likes: number;
}

export interface Author {
    name: string;
    role: string;
    description: string;
    image: string;
}

// 旅費精算プロジェクト用の型定義
export interface Member {
    id: string;
    name: string;
}

export interface Payment {
    id: string;
    amount: number;
    description: string;
    paidBy: string; // member.id
    paidFor: string[]; // member.id[]
}

export interface ExpenseProject {
    id: string;
    name: string;
    createdAt: string;
    members: Member[];
    payments: Payment[];
}

export interface CalculationResult {
    from: string;
    to: string;
    amount: number;
}

// 地域別ページ用の地域の型
export interface regionProps {
    city: string;
    images: string[];
    country: string;
    title: string;
    description: string;
}
