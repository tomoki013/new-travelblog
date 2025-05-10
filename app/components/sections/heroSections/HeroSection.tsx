import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const HeroSection = () => {
    return (
        <section className="relative h-[70vh] w-full">
            <div className="absolute inset-0">
                <Image
                    src="/images/India/tajmahal.jpg"
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                    旅の記録と発見の物語
                </h1>
                <p className="mb-8 max-w-2xl text-lg sm:text-xl">
                    日本と世界の美しい風景、文化、食べ物を通じて、新しい旅の発見をお届けします
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href='/diary'>旅行日記を読む</Link>
                    </Button>
                    <Button asChild variant='outline' size="lg" className="bg-transparent text-white hover:bg-white hover:text-black">
                        <Link href='/tourism'>観光情報を見る</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;
