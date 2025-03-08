'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge, Heart, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

    const photos = [
        {
            id: 1,
            title: 'タージマハル',
            description: 'タージマハル',
            image: '/images/India/tajmahal.jpg',
            location: 'インド-アグラ',
            category: '寺院',
            likes: 124,
          },
          {
            id: 2,
            title: 'アンベール城',
            description: 'アンベール城',
            image: '/images/India/amber-palace-1.jpg',
            location: 'インド-ジャイプル',
            category: '城',
            likes: 98,
          },
          {
            id: 3,
            title: 'バラナシの祭り',
            description: 'バラナシの祭り',
            image: '/images/India/festival-2.jpg',
            location: 'インド-バラナシ',
            category: '街並み',
            likes: 156,
          },
          {
            id: 4,
            title: 'インド門',
            description: 'インド門',
            image: '/images/India/indian-gate-1.jpg',
            location: 'インド-ニューデリー',
            category: '都市',
            likes: 210,
          },
          {
            id: 5,
            title: 'ロータス寺院',
            description: 'ロータス寺院',
            image: '/images/India/lotus-temple.jpg',
            location: 'インド-ニューデリー',
            category: '寺院',
            likes: 87,
          },
          {
            id: 6,
            title: 'ハワー・マハル',
            description: 'ハワー・マハル',
            image: '/images/India/pink-city-1.jpg',
            location: 'インド-ジャイプル',
            category: '都市',
            likes: 132,
          },
          {
            id: 7,
            title: 'チャオプラヤー川',
            description: 'チャオプラヤー川',
            image: '/images/Thai/thai-hotel-2.jpg',
            location: 'タイ-バンコク',
            category: '街並み',
            likes: 145,
          },
          {
            id: 8,
            title: 'ワット・プラ・ケオ',
            description: 'ワット・プラ・ケオ',
            image: '/images/Thai/wat-arkeow-2.jpg',
            location: 'タイ-バンコク',
            category: '寺院',
            likes: 118,
          },
          {
            id: 9,
            title: 'ワット・アルン',
            description: 'ワット・アルン',
            image: '/images/Thai/wat-arun-3.jpg',
            location: 'タイ-バンコク',
            category: '寺院',
            likes: 176,
          },
          {
            id: 10,
            title: 'ベトナムの交差点',
            description: 'ベトナムの交差点',
            image: '/images/Vietnam/dong-kinh-nghia-thuc-square.jpg',
            location: 'ベトナム-ハノイ',
            category: '街並み',
            likes: 92,
          },
          {
            id: 11,
            title: '札幌テレビ塔',
            description: '札幌テレビ塔',
            image: '/images/Hokkaido/sapporo-tv-tower.jpg',
            location: '北海道-札幌',
            category: '都市',
            likes: 104,
          },
          {
            id: 12,
            title: '小樽運河',
            description: '小樽運河',
            image: '/images/Hokkaido/otaru-canal.jpg',
            location: '北海道-小樽',
            category: '街並み',
            likes: 167,
          },
        ]
      
        const categories = [
          { id: 'all', name: 'すべて' },
          { id: 'nature', name: '自然' },
          { id: 'temple', name: '寺院・神社' },
          { id: 'city', name: '都市' },
          { id: 'beach', name: 'ビーチ' },
        ]
      
        const naturePhotos = photos.filter(photo => ['自然', 'ビーチ'].includes(photo.category))
        const templePhotos = photos.filter(photo => ['寺院', '神社', '城'].includes(photo.category))
        const cityPhotos = photos.filter(photo => ['都市', '街並み'].includes(photo.category))
        const beachPhotos = photos.filter(photo => photo.category === 'ビーチ')

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">写真ギャラリー</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">日本各地で撮影した美しい風景や文化的な瞬間を写真で紹介します。</p>
            </div>

            <Tabs defaultValue="all" className="mb-8">
                <TabsList className="mb-8 grid w-full grid-dols-2 sm:grid-cols-5">
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

                <TabsContent value="beach">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {beachPhotos.map((photo) => (
                            <PhotoCard
                                key={photo.id}
                                photo={photo}
                                onClick={() => setSelectedImage(photo)}
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                {selectedImage && (
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>{selectedImage.title}</DialogTitle>
                            <DialogDescription className="flex items-center text-sm">
                                <MapPin className="mr-1 h-3 w-3" />
                                {selectedImage.location}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="relative aspect-video w-full overflow-hidden rounded-md">
                            <Image
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-md"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Badge>{selectedImage.category}</Badge>
                            <div className="flex items-center gap-1 text-sm">
                                <Heart className="h-4 w-4 text-red-500" fill='currentColor' />
                                <span>{selectedImage.likes}</span>
                            </div>
                        </div>
                        <p className="text-muted-foreground">{selectedImage.description}</p>
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
                    <div className="flex items-center gap-1 text-xs">
                        <Heart className="h-3 w-3" fill='currentColor' />
                        <span>{photo.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryPage;
