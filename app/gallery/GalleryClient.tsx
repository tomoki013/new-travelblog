"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import * as Elements from "@/app/components/elements/index";
import { PhotoCard } from "./PhotoCard";
import { Photo } from "@/types/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PhotoGalleryPopupContent from "@/app/components/elements/popupContent/PhotoGalleryPopupContent";

const GalleryClient = () => {
    const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/galleryPhotos');
                if (!response.ok) {
                    throw new Error('HTTP error! status: ' + response.status);
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
    ];

    const photoCollections = {
        all: photos,
        nature: photos.filter(p => ['自然'].includes(p.category)),
        temple: photos.filter(p => ['寺院', '神社', '城', '王宮', '慰霊碑'].includes(p.category)),
        city: photos.filter(p => ['都市', '街並み', '祭り', '市場', '広場'].includes(p.category)),
        tourism: photos.filter(p => ['タワー', '美術館', '聖堂', '建築', '闘牛場', '教会'].includes(p.category)),
        food: photos.filter(p => ['グルメ', 'スイーツ'].includes(p.category)),
        transport: photos.filter(p => ['空港', '公共交通', '商業施設'].includes(p.category)),
    };

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">写真ギャラリー</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">世界各地で撮影した美しい風景や文化的な瞬間を写真で紹介します。次の旅のインスピレーションに！</p>
            </div>
            {isLoading ? (
                <Elements.LoadingAnimation />
            ) : (
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-7 h-auto">
                        {categories.map((category) => (
                            <TabsTrigger key={category.id} value={category.id}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    
                    {Object.entries(photoCollections).map(([key, photoList]) => (
                        <TabsContent key={key} value={key}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {photoList.map((photo) => (
                                    <PhotoCard
                                        key={photo.title}
                                        photo={photo}
                                        onClick={() => setSelectedImage(photo)}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            )}
             {/* ギャラリー内の画像クリックで拡大表示するためのDialog */}
             <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                {selectedImage && (
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-2">
                        <PhotoGalleryPopupContent photo={selectedImage} />
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
};

export default GalleryClient;
