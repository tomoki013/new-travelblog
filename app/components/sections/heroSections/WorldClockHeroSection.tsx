import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Link from "next/link";

const WorldClockHeroSection = () => {
    return (
        <div className="container relative z-10">
            <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="lg:order-2">
                    <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                        世界の時刻を一目で確認
                    </h2>
                    <p className="mb-6 text-lg text-muted-foreground">
                        海外旅行の計画や、海外の友人との連絡に便利な世界時計。
                        主要都市の現地時刻をリアルタイムで確認できます。
                    </p>
                    <Button asChild size="lg">
                        <Link href="/clock" className="inline-flex items-center">
                            <Clock className="mr-2 h-5 w-5" />
                            世界時計を見る
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-4 lg:order-1">
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4">
                            <h3 className="mb-2 text-sm font-medium">東京</h3>
                            <p className="text-2xl font-bold">21:00</p>
                        </Card>
                        <Card className="p-4">
                            <h3 className="mb-2 text-sm font-medium">ニューヨーク</h3>
                            <p className="text-2xl font-bold">07:00</p>
                        </Card>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4">
                            <h3 className="mb-2 text-sm font-medium">ロンドン</h3>
                            <p className="text-2xl font-bold">12:00</p>
                        </Card>
                        <Card className="p-4">
                            <h3 className="mb-2 text-sm font-medium">シドニー</h3>
                            <p className="text-2xl font-bold">23:00</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorldClockHeroSection;
