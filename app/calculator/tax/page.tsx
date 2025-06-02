import TaxCalculatorForm from "./TaxCalculatorForm"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '税金計算ツール',
    description: '商品やサービスの税込価格を簡単に計算できるツールです。異なる税率にも対応し、正確な支払額を把握できます。',
    openGraph: {
        title: '税金計算ツール',
        description: '商品やサービスの税込価格を簡単に計算できるツールです。異なる税率にも対応し、正確な支払額を把握できます。',
    },
    twitter: {
        title: '税金計算ツール',
        description: '商品やサービスの税込価格を簡単に計算できるツールです。異なる税率にも対応し、正確な支払額を把握できます。',
    },
}

const TaxCalculatorPage = () => {
    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">税金計算</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    商品やサービスの税込価格を簡単に計算できます。異なる税率にも対応し、正確な支払額を把握できます。
                </p>
            </div>
            <div className="mx-auto max-w-xl">
                <TaxCalculatorForm />
            </div>
        </div>
    )
}

export default TaxCalculatorPage;
