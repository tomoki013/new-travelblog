import { getRegionBySlug, getAllRegionSlugs } from "@/lib/regionUtil";
import Client from "./Client";
import { notFound } from "next/navigation";
import { regionData } from "@/data/region";
import { getAllPosts } from "@/lib/posts";

// 1. 静的パスを生成
export async function generateStaticParams() {
  const slugs = getAllRegionSlugs();
  return slugs.map((slug) => ({
    region: slug,
  }));
}

// 2. Pageコンポーネント
const DestinationPage = async (props: {
  params: Promise<{ region: string }>;
}) => {
  const params = await props.params;
  const regionSlug = params.region;
  const currentRegion = getRegionBySlug(regionSlug);

  // 地域が見つからなければ404
  if (!currentRegion) {
    return notFound();
  }

  // 3. 関連する記事を取得
  const country = regionData
    .flatMap((continent) => continent.countries)
    .find((c) => c.slug === regionSlug);

  const targetSlugs = [regionSlug];
  if (country && country.children) {
    targetSlugs.push(...country.children.map((child) => child.slug));
  }

  const filteredPosts = await getAllPosts({ region: targetSlugs });

  const seriesPosts = filteredPosts.filter(
    (post) => post.category === "series"
  );
  const tourismPosts = filteredPosts.filter(
    (post) => post.category === "tourism"
  );
  const itineraryPosts = filteredPosts.filter(
    (post) => post.category === "itinerary"
  );

  return (
    <Client
      region={currentRegion}
      seriesPosts={seriesPosts}
      tourismPosts={tourismPosts}
      itineraryPosts={itineraryPosts}
      regionData={regionData}
    />
  );
};

export default DestinationPage;
