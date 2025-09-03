import Hero from "@/components/sections/Hero";
import NewPosts from "@/components/sections/NewPosts";
import FeaturedSeries from "@/components/sections/FeaturedSeries";
import PopularPosts from "@/components/sections/PopularPosts";
import Gallery from "@/components/sections/Gallery";
import Request from "@/components/sections/Request";
import { getAllPosts } from "@/lib/posts";
import Destination from "@/components/sections/Destination";
import PostsLength from "@/components/sections/PostsLength";
import GalleryLength from "@/components/sections/GalleryLength";

export default async function HomePage() {
  const allPosts = await getAllPosts();
  return (
    <>
      <Hero />
      <NewPosts posts={allPosts} />
      <Destination />
      <FeaturedSeries />
      <PopularPosts posts={allPosts} />
      <Gallery />
      <Request />
      <PostsLength posts={allPosts} />
      <GalleryLength />
    </>
  );
}
