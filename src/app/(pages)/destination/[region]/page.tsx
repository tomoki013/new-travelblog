import { getRegionBySlugOptimized } from "@/lib/regionUtil";
import Client from "./Client";
import { notFound } from "next/navigation";
import getAllPosts from "@/lib/markdown";
import { regionsData } from "@/data/regions";
import { Post } from "@/types/types";

const DestinationPage = async (props: {
  params: Promise<{ region: string }>;
}) => {
  const params = await props.params;
  const region = params.region;
  const currentRegion = getRegionBySlugOptimized(region);

  if (!currentRegion) {
    return notFound();
  }

  // 1. 表示対象となる地域のslugリストを作成
  // まずは現在の地域のslugを追加
  const targetSlugs = [currentRegion.slug];

  // もし子要素（都市）があれば、そのslugもすべてリストに追加
  if (currentRegion.children && currentRegion.children.length > 0) {
    const childSlugs = currentRegion.children.map((child) => child.slug);
    return targetSlugs.push(...childSlugs);
  }
  console.log(targetSlugs);
  console.log(currentRegion.children);

  // 2. 記事をフィルタリングする
  // 投稿の location 配列に targetSlugs のいずれかが含まれていれば表示対象とする
  const filterPostsByLocation = (posts: Post[]) => {
    return posts.filter((post) =>
      post.location.some((loc) => targetSlugs.includes(loc))
    );
  };

  const seriesPosts = filterPostsByLocation(getAllPosts("series"));
  const tourismPosts = filterPostsByLocation(getAllPosts("tourism"));
  const itineraryPosts = filterPostsByLocation(getAllPosts("itinerary"));

  return (
    <Client
      region={currentRegion}
      seriesPosts={seriesPosts}
      tourismPosts={tourismPosts}
      itineraryPosts={itineraryPosts}
      regionsData={regionsData}
    />
  );
};

export default DestinationPage;
