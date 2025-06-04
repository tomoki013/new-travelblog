import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/types";

const ImageOverlayPostCard = ({ post, linkPrefix }: { post: Post; linkPrefix: string }) => (
    <Link href={`/${linkPrefix}/${post.slug}`}>
        <div className="group relative h-64 overflow-hidden rounded-lg">
            <Image
                src={post.image}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
                <Badge className="mb-2">{post.category}</Badge>
                <h3 className="text-lg font-bold">{post.title}</h3>
            </div>
        </div>
    </Link>
);

export default ImageOverlayPostCard;
