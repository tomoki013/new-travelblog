import { featuredSeries } from "@/data/series";
import { getAllPosts } from "@/lib/posts";
import Client from "./Client";
import { Post } from "@/types/types";

const eachSeries = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await props.params;
  const slug = await params.slug;

  const series = featuredSeries.find((s) => s.slug === slug);
  if (!series) return <div>シリーズが見つかりませんでした。</div>;

  const allSeriesPosts = await getAllPosts({ type: "series" });
  const allPosts = allSeriesPosts.filter((post) => post.series === slug);

  return <Client allPosts={allPosts} series={series} />;
};

export default eachSeries;
