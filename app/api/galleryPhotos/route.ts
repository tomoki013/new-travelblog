import { NextResponse } from 'next/server';
import photosData from '../../../public/data/galleryPhoto/galleryPhoto.json';
import fs from 'fs';
import path from 'path';

// JSONデータの型定義
interface Photo {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    category: string;
    likes: number;
}

export async function GET() {
    try {
        // JSONデータをIDで降順にソート
        const sortedPhotos = (photosData as Photo[]).sort((a, b) => b.id - a.id);
        return NextResponse.json(sortedPhotos);
    } catch (error) {
        console.error("Failed to load photos from JSON:", error);
        return NextResponse.json({ error: "Failed to load photos" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const newPhoto = await req.json() as Omit<Photo, 'id'>; // 型アサーションを追加
        const photos = photosData as Photo[]; // photosData に型アサーションを追加
        const maxId = photos.length > 0 ? Math.max(...photos.map(photo => photo.id)) : 0; // 空配列の場合を考慮
        const newId = maxId + 1;

        const photoWithId: Photo = { id: newId, ...newPhoto }; // 型エラー解消
        const updatedPhotos = [...photos, photoWithId];

        const filePath = path.join(process.cwd(), 'public', 'data', 'galleryPhoto.json');
        fs.writeFileSync(filePath, JSON.stringify(updatedPhotos, null, 2), 'utf-8');

        return NextResponse.json(photoWithId, { status: 201 });
    } catch (error) {
        console.error("Failed to add new photo:", error);
        return NextResponse.json({ error: "Failed to add new photo" }, { status: 500 });
    }
}
