import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center text-center text-white">
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
        <div className="font-code text-4xl mt-4 text-white/90">Tomokichi</div>
      </div>
    </section>
  );
};

export default HeroSection;
