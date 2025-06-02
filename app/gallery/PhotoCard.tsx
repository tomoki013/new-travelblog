import { MapPin } from "lucide-react";
import Image from "next/image";

interface Photo {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    category: string;
    likes: number;
}

interface PhotoCardProps {
    photo: Photo;
    onClick: () => void;
}

export const PhotoCard = ({ photo, onClick }: PhotoCardProps) => {
    return (
        <div
            className="group relative cursor-pointer overflow-hidden rounded-lg"
            onClick={onClick}
        >
            <div className="relative aspect-square">
                <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-lg font-bold">{photo.title}</h3>
                <div className="flex items-center justify-between">
                    <span className="flex items-center text-xs">
                        <MapPin className="mr-1 h-3 w-3" />
                        {photo.location}
                    </span>
                </div>
            </div>
        </div>
    );
};
