'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as Elements from "@/app/components/elements/index";
import ReactDOMServer from "react-dom/server";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "ともきちの旅行日記 | 写真ギャラリー– 写真で次の旅先を見つけよう",
//     description: "ともきちの旅行日記の「写真ギャラリー」では、世界各国の美しい風景や旅先の瞬間を切り取った写真を多数掲載。お気に入りの一枚から次に行きたい旅行先を見つけたり、旅のインスピレーションを得られるコンテンツが満載です。写真を眺めながら、あなたの次の冒険を計画してみませんか？",
// };

interface Photo {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    category: string;
    likes: number;
}

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/galleryPhotos');
                if (!response.ok) {
                    throw new Error('HTTP error! status: ${response.status}');
                }
                const data: Photo[] = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error('Failed to load photos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPhotos();
    }, []);
      
    const categories = [
        { id: 'all', name: 'すべて' },
        { id: 'nature', name: '自然' },
        { id: 'temple', name: '寺院・神社' },
        { id: 'city', name: '街並み' },
        { id: 'tourism', name: '観光地' },
        { id: 'food', name: 'グルメ' },
        { id: 'transport', name: '公共交通・商業施設' },
    ]
    
    const naturePhotos = photos.filter(photo => ['自然'].includes(photo.category))
    const templePhotos = photos.filter(photo => ['寺院', '神社', '城', '王宮', '慰霊碑'].includes(photo.category))
    const cityPhotos = photos.filter(photo => ['都市', '街並み', '祭り', '市場', '広場'].includes(photo.category))
    const tourismPhotos = photos.filter(photo => ['タワー', '美術館', '聖堂', '建築', '闘牛場', '教会'].includes(photo.category))
    const foodPhotos = photos.filter(photo => ['グルメ', 'スイーツ'].includes(photo.category))
    const transportPhotos = photos.filter(photo => ['空港', '公共交通', '商業施設'].includes(photo.category))

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">写真ギャラリー</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">日本各地で撮影した美しい風景や文化的な瞬間を写真で紹介します。</p>
            </div>

            {isLoading ? (
                <Elements.LoadingAnimation />
            ) : (
                <Tabs defaultValue="all" className="mb-8">
                    <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-7 h-auto">
                        {categories.map((category) => (
                            <TabsTrigger key={category.id} value={category.id}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="all">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {photos.map((photo) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    onClick={() => setSelectedImage(photo)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="nature">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {naturePhotos.map((photo) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    onClick={() => setSelectedImage(photo)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="temple">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {templePhotos.map((photo) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    onClick={() => setSelectedImage(photo)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="city">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {cityPhotos.map((photo) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    onClick={() => setSelectedImage(photo)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="tourism">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {tourismPhotos.map((photo) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    onClick={() => setSelectedImage(photo)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="food">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {foodPhotos.map((photo) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    onClick={() => setSelectedImage(photo)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="transport">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {transportPhotos.map((photo) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    onClick={() => setSelectedImage(photo)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            )}

            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                {selectedImage && (
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-2">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: ReactDOMServer.renderToString(<PopupContent photo={selectedImage} />),
                            }}
                        />
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
}

interface Photo {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    category: string;
    likes: number;
}

const PopupContent = ({ photo }: { photo: Photo }) => (
    <div>
        <div>
            <h1 className="text-2xl font-bold">{photo.title}</h1>
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
            {/* <div className="flex items-center gap-1 text-sm">
                <Heart className="h-4 w-4 text-red-500" fill='currentColor' />
                <span>{photo.likes}</span>
            </div> */}
        </div>
        <p className="text-muted-foreground">{photo.description}</p>
    </div>
);

function PhotoCard({ photo, onClick }: { photo: Photo; onClick: () => void }) {
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
                    {/* <div className="flex items-center gap-1 text-xs">
                        <Heart className="h-3 w-3" fill='currentColor' />
                        <span>{photo.likes}</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default GalleryPage;
