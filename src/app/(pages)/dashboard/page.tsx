import GalleryLength from "@/components/pages/GalleryLength";
import PostsLength from "@/components/pages/PostsLength";
import { getPhotos } from "@/lib/photo";
import { getAllPosts } from "@/lib/posts";

const Dashboard = async () => {
  const allPosts = await getAllPosts();
  const allPhotos = (await getPhotos()).length;
  return (
    <div>
      <PostsLength posts={allPosts} />
      <GalleryLength galleryLength={allPhotos} />
    </div>
  );
};

export default Dashboard;
