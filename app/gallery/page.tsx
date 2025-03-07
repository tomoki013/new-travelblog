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
            title: '京都の金閣寺',
            description: '秋の紅葉シーズンに撮影した金閣寺の美しい風景',
            image: 'https://images.unsplash.com/photo-1601823984263-b87b59798b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '京都府',
            category: '寺院',
            likes: 124,
          },
          {
            id: 2,
            title: '富士山と湖',
            description: '早朝の河口湖から撮影した富士山の絶景',
            image: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '山梨県',
            category: '自然',
            likes: 98,
          },
          {
            id: 3,
            title: '東京スカイツリー',
            description: '夜景に映える東京スカイツリーの美しい姿',
            image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '東京都',
            category: '都市',
            likes: 156,
          },
          {
            id: 4,
            title: '沖縄のビーチ',
            description: '透明度抜群の沖縄の海と白い砂浜',
            image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '沖縄県',
            category: 'ビーチ',
            likes: 210,
          },
          {
            id: 5,
            title: '奈良公園の鹿',
            description: '奈良公園で出会った人懐っこい鹿たち',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '奈良県',
            category: '動物',
            likes: 87,
          },
          {
            id: 6,
            title: '大阪城',
            description: '桜の季節に撮影した壮大な大阪城',
            image: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '大阪府',
            category: '城',
            likes: 132,
          },
          {
            id: 7,
            title: '北海道の雪景色',
            description: '冬の北海道で撮影した美しい雪景色',
            image: 'https://images.unsplash.com/photo-1548026983-e899d8f5cdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '北海道',
            category: '自然',
            likes: 145,
          },
          {
            id: 8,
            title: '浅草寺',
            description: '東京の浅草寺と雷門の風景',
            image: 'https://images.unsplash.com/photo-1570521462033-3015e76e7432?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '東京都',
            category: '寺院',
            likes: 118,
          },
          {
            id: 9,
            title: '広島の宮島',
            description: '海に浮かぶ厳島神社の大鳥居',
            image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '広島県',
            category: '神社',
            likes: 176,
          },
          {
            id: 10,
            title: '高山の古い町並み',
            description: '飛騨高山の風情ある古い町並み',
            image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '岐阜県',
            category: '町並み',
            likes: 92,
          },
          {
            id: 11,
            title: '鎌倉の大仏',
            description: '鎌倉の高徳院にある大仏の姿',
            image: 'https://images.unsplash.com/photo-1565618754154-c8011e5df2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '神奈川県',
            category: '寺院',
            likes: 104,
          },
          {
            id: 12,
            title: '日本アルプスの山々',
            description: '長野県から撮影した日本アルプスの雄大な風景',
            image: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            location: '長野県',
            category: '自然',
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
        const cityPhotos = photos.filter(photo => ['都市', '町並み'].includes(photo.category))
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
                    src={'/images/India/tajimahal.jpg'}
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
