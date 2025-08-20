import HeroSection from "@/components/sections/Hero";
import NewPosts from "@/components/sections/NewPosts";
import FeaturedSeries from "@/components/sections/FeaturedSeries";
// import PopularPosts from "@/components/sections/PopularPosts";
import Gallery from "@/components/sections/Gallery";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NewPosts />
      <FeaturedSeries />
      {/* <PopularPosts /> */}
      <Gallery />
    </>
  );
}
