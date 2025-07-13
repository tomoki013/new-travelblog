import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Photo, Post } from "@/types/types";
import { DialogTitle } from "@radix-ui/react-dialog";
import * as Sections from "@/app/components/sections/index";

interface PhotoGalleryPopupContentProps {
    photo: Photo;
    posts: Post[];
}

const PhotoGalleryPopupContent = ({
    photo,
    posts,
}: PhotoGalleryPopupContentProps
) => {
    const relatedPosts = posts.filter(
        post =>
            post.title.includes(photo.title) ||
            post.title.includes(photo.description) ||
            post.excerpt.includes(photo.title) ||
            post.excerpt.includes(photo.description) ||
            post.content.includes(photo.title) ||
            post.content.includes(photo.description)
    )

    return (
        <div>
            <div>
                <DialogTitle className="text-2xl font-bold">{photo.title}</DialogTitle>
                <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {photo.location}
                </p>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-md my-4">
                <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                />
            </div>
            <div className="flex items-center justify-between mb-4">
                <Badge>{photo.category}</Badge>
            </div>
            <p className="text-muted-foreground">{photo.description}</p>
            <div className="mt-6">
                <Sections.Posts
                    initialPosts={relatedPosts}
                    postFilterType="tourism"
                    showSearchInput={false}
                    showCategoryTabs={false}
                    displayCount={2} // 表示する投稿の最大数を指定
                    postsGridColsClass="sm:grid-cols-1 lg:grid-cols-1"
                    textForIsPosts=""
                />
            </div>
        </div>
    )
};

export default PhotoGalleryPopupContent;
