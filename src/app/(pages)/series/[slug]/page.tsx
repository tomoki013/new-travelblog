import { featuredSeries } from "@/data/series";
import getPosts from "@/lib/posts";
import Client from "./Client";

const eachSeries = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await props.params;
  const slug = await params.slug;
import { Post } from "@/types/types";

  const series = featuredSeries.find((s) => s.slug === slug);
  if (!series) return <div>シリーズが見つかりませんでした。</div>;

  const allPosts = (await getPosts({ series: slug })) as Post[];

  return <Client allPosts={allPosts} series={series} />;
};

export default eachSeries;
