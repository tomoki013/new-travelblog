import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RouletteHeroSection = () => {
    return (
        <div className="container relative z-10">
            <div className="grid items-center gap-8 lg:grid-cols-2 p-2">
                <div>
                    <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                        次の旅行先が決まらない？<br />
                        旅行先ルーレットで運命の場所を見つけよう！
                    </h2>
                    <p className="mb-6 text-lg text-muted-foreground">
                        行き先に迷ったら、ルーレットを回して運命の旅行先を見つけましょう。
                        選ばれた場所に関連する情報や記事もご紹介します。思いがけない発見があるかもしれません。
                    </p>
                    <Button asChild size="lg">
                        <Link href="/roulette" className="inline-flex items-center">
                            <Compass className="mr-2 h-5 w-5" />
                            ルーレットを回す
                        </Link>
                    </Button>
                </div>
                <div className="relative">
                    <div className="relative aspect-square max-w-md overflow-hidden rounded-full border-8 border-primary/20">
                        <Image
                            src="/images/France/eiffel-tower-and-sunset.jpg"
                            alt="エッフェル塔と夕陽"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <div className="text-center text-white">
                                <Compass className="mb-4 h-16 w-16" />
                                <p className="text-xl font-bold">どこへ行く？</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RouletteHeroSection;
