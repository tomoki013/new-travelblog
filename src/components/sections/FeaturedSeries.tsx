import { featuredSeries } from "@/data/series";
import SeriesCard from "../elements/SeriesCard";
import Link from "next/link";

const FeaturedSeries = () => {
  return (
    <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto">
      {/* セクションタイトル */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          Featured Series
        </h2>
        <div className="w-30 h-0.5 bg-secondary mx-auto mt-6"></div>
      </div>

      {/* カードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {featuredSeries.slice(0, 6).map((series) => (
          <SeriesCard key={series.id} series={series} />
        ))}
      </div>

      {/* ボタン */}
      <div className="text-center">
        <Link
          href={`/series`}
          className="inline-block py-3 px-10 bg-secondary text-white uppercase text-sm font-bold tracking-wider rounded-full border-2 border-secondary transition-all duration-300 ease-in-out hover:bg-transparent hover:text-secondary"
        >
          シリーズ一覧を見る
        </Link>
      </div>
    </section>
  );
};

export default FeaturedSeries;
