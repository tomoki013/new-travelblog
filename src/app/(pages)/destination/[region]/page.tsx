import { getRegionBySlug, getAllRegionSlugs } from "@/lib/regionUtil";
import Client from "./Client";
import { notFound } from "next/navigation";
import { regionData } from "@/data/region";
import { getPostsByRegion } from "@/lib/getPostData";

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
  const { seriesPosts, tourismPosts, itineraryPosts } =
    getPostsByRegion(regionSlug);

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
