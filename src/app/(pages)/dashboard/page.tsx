import GalleryLength from "@/components/sections/GalleryLength";
import PostsLength from "@/components/sections/PostsLength";
import { getPhotos } from "@/lib/photo";
import { getAllPosts } from "@/lib/posts";

const Dashboard = async () => {
  const allPosts = await getAllPosts();
  const allPhotos = await getPhotos();
  return (
    <div>
      <PostsLength posts={allPosts} />
      <GalleryLength photos={allPhotos} />
    </div>
  );
};

export default Dashboard;
