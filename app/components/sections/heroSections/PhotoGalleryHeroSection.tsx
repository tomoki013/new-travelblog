import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PhotoGalleryHeroSection = () => {
    return (
        <div className="container relative z-10">
            <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                        美しい瞬間を写真で共有
                    </h2>
                    <p className="mb-6 text-lg text-muted-foreground">
                        旅先で出会った絶景や思い出の風景を写真ギャラリーでご覧いただけます。
                        日本各地の四季折々の表情や、世界の絶景をお楽しみください。
                    </p>
                    <Button asChild size="lg">
                        <Link href="/gallery" className="inline-flex items-center">
                            <Camera className="mr-2 h-5 w-5" />
                            ギャラリーを見る
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative aspect-square overflow-hidden rounded-lg">
                            <Image
                                src="/images/India/tajmahal.jpg"
                                alt="タージマハル"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative aspect-square overflow-hidden rounded-lg">
                            <Image
                                src="/images/Spain/toledo-view.jpg"
                                alt="トレド旧市街の景色"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                        <Image
                            src="/images/France/eiffel-tower-and-sunset.jpg"
                            alt="夕陽とエッフェル塔"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoGalleryHeroSection;
