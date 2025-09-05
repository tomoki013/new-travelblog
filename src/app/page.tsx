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
import { getPhotos } from "@/lib/photo";

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const allPhotos = (await getPhotos()).slice(0, 24);
  return (
    <>
      <Hero />
      <NewPosts posts={allPosts} />
      <Destination />
      <FeaturedSeries />
      <PopularPosts posts={allPosts} />
      <Gallery photos={allPhotos} />
      <Request />
      <PostsLength posts={allPosts} />
      <GalleryLength photos={allPhotos} />
    </>
  );
}
