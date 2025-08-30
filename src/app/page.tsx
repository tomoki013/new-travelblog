import Hero from "@/components/sections/Hero";
import NewPosts from "@/components/sections/NewPosts";
import FeaturedSeries from "@/components/sections/FeaturedSeries";
import PopularPosts from "@/components/sections/PopularPosts";
import Gallery from "@/components/sections/Gallery";
import Request from "@/components/sections/Request";
import getPosts from "@/lib/posts";
import { Post } from "@/types/types";

export default async function HomePage() {
  const newPosts = (await getPosts({ limit: 5 })) as Post[];
  const popularPosts = (await getPosts({ popular: true, limit: 5 })) as Post[];
  return (
    <>
      <Hero />
      <NewPosts posts={newPosts} />
      <FeaturedSeries />
      <PopularPosts posts={popularPosts} />
      <Gallery />
      <Request />
    </>
  );
}
