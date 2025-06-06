import ImageOverlayPostCard from "@/app/components/elements/card/ImageOverlayPostCard";
import HorizontalPostCard from "@/app/components/elements/card/HorizontalPostCard";
import StandardPostCard from "@/app/components/elements/card/StandardPostCard";
import { Post } from "@/lib/types";
import ItineraryListCard from "../card/ItineraryListCard";

interface PostCardProps {
    post: Post;
    linkPrefix: string;
    postCardType?: number;
}

const PostCard = ({ post, linkPrefix, postCardType }: PostCardProps) => {
    const type = postCardType || 1;
    if (type === 2) {
        return <ImageOverlayPostCard post={post} linkPrefix={linkPrefix} />;
    }
    if (type === 3) {
        return <HorizontalPostCard post={post} linkPrefix={linkPrefix} />;
    }
    if (type === 4) {
        return <ItineraryListCard post={post} linkPrefix={linkPrefix} />;
    }
    return <StandardPostCard post={post} linkPrefix={linkPrefix} />;
};

export default PostCard;
