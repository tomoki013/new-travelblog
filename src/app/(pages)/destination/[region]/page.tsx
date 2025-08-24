import { getRegionBySlug } from "@/lib/regionUtil";
import Client from "./Client";
import { notFound } from "next/navigation";
import getAllPosts from "@/lib/markdown";

const DestinationPage = async (props: {
  params: Promise<{ region: string }>;
}) => {
  const params = await props.params;
  const currentRegion = getRegionBySlug(params.region);

  let seriesPosts = getAllPosts("series")
    .filter((post) => post.location.find((l) => l === params.region))
    .slice(0, 2);
  const tourismPosts = getAllPosts("tourism")
    .filter((post) => post.location.find((l) => l === params.region))
    .slice(0, 3);
  const itineraryPosts = getAllPosts("itinerary")
    .filter((post) => post.location.find((l) => l === params.region))
    .slice(0, 3);

  if (!currentRegion) return notFound();
  if (
    seriesPosts.length === 0 &&
    tourismPosts.length === 0 &&
    itineraryPosts.length === 0
  ) {
    seriesPosts = [
      {
        id: "0",
        slug: "#",
        title: "This region doesn't has any blogs.",
        dates: [],
        content: "",
        excerpt: "",
        image: "",
        category: [],
        location: [],
        author: "",
        tags: [],
        type: "series",
      },
    ];
  }

  return (
    <Client
      region={currentRegion}
      seriesPosts={seriesPosts}
      tourismPosts={tourismPosts}
      itineraryPosts={itineraryPosts}
    />
  );
};

export default DestinationPage;
