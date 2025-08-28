import Hero from "@/components/sections/Hero";
import NewPosts from "@/components/sections/NewPosts";
import FeaturedSeries from "@/components/sections/FeaturedSeries";
import PopularPosts from "@/components/sections/PopularPosts";
import Gallery from "@/components/sections/Gallery";
import Request from "@/components/sections/Request";
import { getAllPostTypes } from "@/lib/markdown";

export default function HomePage() {
  const allPosts = getAllPostTypes();
  return (
    <>
      <Hero />
      <NewPosts posts={allPosts} />
      <FeaturedSeries />
      <PopularPosts posts={allPosts} />
      <Gallery />
      <Request />
    </>
  );
}
