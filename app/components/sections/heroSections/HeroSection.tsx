import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as Elements from "@/app/components/elements/index";

const HeroSection = () => {
    return (
        <section className="relative h-[70vh] w-full">
            <Elements.Slide />
            <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                    旅の記録と発見の物語
                </h1>
                <p className="mb-8 max-w-2xl text-lg sm:text-xl">
                    日本と世界の美しい風景、文化、食べ物を通じて、新しい旅の発見をお届けします
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="/diary">旅行日記を読む</Link>
                </Button>
                <Button
                    asChild
                    size="lg"
                >
                    <Link href="/tourism">観光情報を見る</Link>
                </Button>
                <Button
                    asChild
                    size="lg"
                >
                    <Link href="/itinerary">旅程＆費用レポートを見る</Link>
                </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
