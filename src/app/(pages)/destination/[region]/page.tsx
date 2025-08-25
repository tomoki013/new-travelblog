import { getRegionBySlug } from "@/lib/regionUtil";
import Client from "./Client";
import { notFound } from "next/navigation";
import getAllPosts from "@/lib/markdown";
import { regionsData } from "@/data/regions";

const DestinationPage = async (props: {
  params: Promise<{ region: string }>;
}) => {
  const params = await props.params;
  const currentRegion = getRegionBySlug(params.region);

  const seriesPosts = getAllPosts("series")
    .filter((post) => post.location.find((l) => l === params.region))
    .slice(0, 2);
  const tourismPosts = getAllPosts("tourism")
    .filter((post) => post.location.find((l) => l === params.region))
    .slice(0, 3);
  const itineraryPosts = getAllPosts("itinerary")
    .filter((post) => post.location.find((l) => l === params.region))
    .slice(0, 3);

  if (!currentRegion) return notFound();

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
