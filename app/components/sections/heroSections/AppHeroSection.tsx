import { Card } from "@/components/ui/card";
import { ArrowRight, Calculator, Receipt } from "lucide-react";
import Link from "next/link";

const AppHeroSection = () => {
    return (
        <div className="container relative z-10">
            <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
                旅行に便利な計算ツール
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden">
                    <Link href="/calculator/expense">
                        <div className="p-6">
                            <Calculator className="mb-4 h-8 w-8 text-primary" />
                            <h3 className="mb-2 text-xl font-bold">旅費計算</h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                グループ旅行の費用を簡単に割り勘計算。カテゴリー別に管理して、公平な費用分担を実現します。
                            </p>
                            <span className="text-sm font-medium text-primary">
                                計算ツールを使う
                                <ArrowRight className="ml-1 inline-block h-4 w-4" />
                            </span>
                        </div>
                    </Link>
                </Card>
                {/* <Card className="overflow-hidden">
                    <Link href="/calculator/currency">
                        <div className="p-6">
                            <DollarSign className="mb-4 h-8 w-8 text-primary" />
                            <h3 className="mb-2 text-xl font-bold">為替計算</h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                主要通貨間の為替レートを簡単に計算。旅行前の予算計画や、現地での支出管理に便利です。
                            </p>
                            <span className="text-sm font-medium text-primary">
                                計算ツールを使う
                                <ArrowRight className="ml-1 inline-block h-4 w-4" />
                            </span>
                        </div>
                    </Link>
                </Card> */}
                <Card className="overflow-hidden">
                    <Link href="/calculator/tax">
                        <div className="p-6">
                            <Receipt className="mb-4 h-8 w-8 text-primary" />
                            <h3 className="mb-2 text-xl font-bold">税金計算</h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                商品やサービスの税込価格を簡単に計算。異なる税率にも対応し、正確な支払額を把握できます。
                            </p>
                            <span className="text-sm font-medium text-primary">
                                計算ツールを使う
                                <ArrowRight className="ml-1 inline-block h-4 w-4" />
                            </span>
                        </div>
                    </Link>
                </Card>
            </div>
        </div>
    )
}

export default AppHeroSection;
