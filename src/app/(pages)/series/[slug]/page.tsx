import { featuredSeries } from "@/data/series";
import getAllPosts from "@/lib/markdown";
import Client from "./Client";

const eachSeries = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await props.params;
  const slug = await params.slug;
  const series = featuredSeries.find((s) => s.slug === slug);
  if (!series) return <div>シリーズが見つかりませんでした。</div>;

  const allSeriesPosts = await getAllPosts("series");

  return <Client allPosts={allSeriesPosts} series={series} />;
};

export default eachSeries;
