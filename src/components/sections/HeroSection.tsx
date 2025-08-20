import Image from "next/image";

interface HeroSectionProps {
  src: string;
  alt: string;
  pageTitle?: string; // オプションでページタイトルを受け取る
  pageMessage?: string; // オプションでページメッセージを受け取る
  textColor?: string; // テキストの色を制御するprop
}

const HeroSection = ({
  src,
  alt,
  pageTitle,
  pageMessage,
  textColor = "text-white/80",
}: HeroSectionProps) => {
  return (
    <div className="relative h-64 md:h-80 flex items-center justify-center text-foreground">
      <Image
        src={src}
        alt={alt}
        fill
        objectFit="cover"
        className="brightness-50"
        priority
      />
      <div className={`relative z-10 text-center ${textColor}`}>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          {pageTitle || ""}
        </h1>
        <p className="text-lg md:text-xl mt-2">{pageMessage || ""}</p>
      </div>
    </div>
  );
};

export default HeroSection;
