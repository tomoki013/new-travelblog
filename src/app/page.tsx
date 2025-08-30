import Hero from "@/components/sections/Hero";
import NewPosts from "@/components/sections/NewPosts";
import FeaturedSeries from "@/components/sections/FeaturedSeries";
import PopularPosts from "@/components/sections/PopularPosts";
import Gallery from "@/components/sections/Gallery";
import Request from "@/components/sections/Request";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const allPosts = await getAllPosts();
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
