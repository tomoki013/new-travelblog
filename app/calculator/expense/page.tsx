import ExpenseCalculatorForm from "./ExpenseCalculatorForm"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '旅費計算ツール',
    description: 'グループ旅行の費用を簡単に割り勘計算できる無料ツール。カテゴリー別に管理して、公平な費用分担を実現。旅行計画や予算管理に最適です。',
    openGraph: {
        title: '旅費計算ツール',
        description: 'グループ旅行の費用を簡単に割り勘計算できる無料ツール。カテゴリー別に管理して、公平な費用分担を実現。旅行計画や予算管理に最適です。',
    },
    twitter: {
        title: '旅費計算ツール',
        description: 'グループ旅行の費用を簡単に割り勘計算できる無料ツール。カテゴリー別に管理して、公平な費用分担を実現。旅行計画や予算管理に最適です。',
    },
}

const ExpenseCalculatorPage = () => {
    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">旅費計算</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    グループ旅行の費用を簡単に割り勘計算できます。カテゴリー別に管理して、公平な費用分担を実現しましょう。
                </p>
            </div>
            <div className="mx-auto max-w-xl">
                <ExpenseCalculatorForm />
            </div>
        </div>
    )
}

export default ExpenseCalculatorPage;
