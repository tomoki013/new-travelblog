import Image from "next/image";
import { LoadingAnimation } from "../featured/LoadingAnimation/LoadingAnimation";
import { allRegions } from "@/lib/regionUtil";
import WorldMap from "../featured/worldMap/WorldMap";
import { regionData } from "@/data/region";
import { shuffleArray } from "@/lib/shuffleArray";

const Hero = () => {
  // すべての国名を小文字の配列として抽出
  const allCountryNames = regionData.flatMap((continent) =>
    continent.countries.map((country) => country.slug)
  );
  return (
    <section className="relative h-[85vh] flex flex-col md:flex-row items-center justify-center text-center text-white">
      <Image
        src={`/images/Turkey/balloons-in-cappadocia.jpg`}
        alt="Man looking at a globe"
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="absolute inset-0 bg-black/35 -z-10" />
      <div className="max-w-4xl px-8">
        <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4 leading-tight text-shadow-[2px_2px_10px_rgba(0,0,0,0.5)]">
          次の冒険は、どこへ？
        </h1>
        <p className="text-lg md:text-xl font-medium">
          世界を旅した記憶と体験を、あなたと共有したい
        </p>
        <div className="font-code text-4xl my-4 text-white/90">Tomokichi</div>
        <LoadingAnimation
          variant="splitFlap"
          className="flex justify-center items-center mt-12"
          words={shuffleArray(
            allRegions.map((region) => region.slug.toUpperCase())
          )}
          flapBG=""
        />
      </div>
      <WorldMap highlightedRegions={allCountryNames} isClickable={false} />
    </section>
  );
};

export default Hero;
