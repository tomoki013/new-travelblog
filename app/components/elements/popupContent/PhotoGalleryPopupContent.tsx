import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Photo {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    category: string;
    likes: number;
}

const PhotoGalleryPopupContent = ({ photo }: { photo: Photo }) => (
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
    </div>
);

export default PhotoGalleryPopupContent;
