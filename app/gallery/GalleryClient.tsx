"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState, useMemo } from "react";
import * as Elements from "@/app/components/elements/index";
import { Photo, Post } from "@/types/types";

const GalleryClient = ({ posts }: { posts: Post[] }) => {
    const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredPhotos = useMemo(() => {
        if (!searchQuery) {
            return photos;
        }
        return photos.filter(photo =>
            photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            photo.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, photos]);

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
        all: filteredPhotos,
        nature: filteredPhotos.filter(p => ['自然'].includes(p.category)),
        temple: filteredPhotos.filter(p => ['寺院', '神社', '城', '王宮', '慰霊碑'].includes(p.category)),
        city: filteredPhotos.filter(p => ['都市', '街並み', '祭り', '市場', '広場'].includes(p.category)),
        tourism: filteredPhotos.filter(p => ['タワー', '美術館', '聖堂', '建築', '闘牛場', '教会'].includes(p.category)),
        food: filteredPhotos.filter(p => ['グルメ', 'スイーツ'].includes(p.category)),
        transport: filteredPhotos.filter(p => ['空港', '公共交通', '商業施設'].includes(p.category)),
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
                <>
                <Elements.SearchBox
                    initialKeyword={searchQuery}
                    onSearch={(keyword) => setSearchQuery(keyword)}
                    mode="realtime"
                    className="w-full"
                />
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
                            {photoList.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {photoList.map((photo) => (
                                        <Elements.PhotoCard
                                            key={photo.title}
                                            photo={photo}
                                            onClick={() => setSelectedImage(photo)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center col-span-full text-muted-foreground">該当する写真はありません。</p>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
                </>
            )}
            {/* ギャラリー内の画像クリックで拡大表示するためのPopup */}
            {selectedImage && (
                 <Elements.Popup
                    buttonType="none"
                    dialogTitle="写真ギャラリー"
                    dialogDescription="左右の矢印で他の写真に切り替えられます。"
                    modalState={!!selectedImage}
                    onClose={() => setSelectedImage(null)}
                 >
                    <Elements.ListForPopup
                        items={photos}
                        initialCurrentIndex={photos.findIndex(p => p.title === selectedImage?.title)}
                        allPosts={posts}
                    />
                </Elements.Popup>
            )}
        </div>
    );
};

export default GalleryClient;
