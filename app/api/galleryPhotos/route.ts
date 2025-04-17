import { NextResponse } from 'next/server';
import photosData from '../../../public/data/galleryPhoto.json';
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
        const newPhoto: Omit<Photo, 'id'> = await req.json();
        const maxId = Math.max(...photosData.map(photo => photo.id));
        const newId = maxId + 1;

        const photoWithId: Photo = { id: newId, ...newPhoto };
        const updatedPhotos = [...photosData, photoWithId];

        const filePath = path.join(process.cwd(), 'public', 'data', 'galleryPhoto.json');
        fs.writeFileSync(filePath, JSON.stringify(updatedPhotos, null, 2), 'utf-8');

        return NextResponse.json(photoWithId, { status: 201 });
    } catch (error) {
        console.error("Failed to add new photo:", error);
        return NextResponse.json({ error: "Failed to add new photo" }, { status: 500 });
    }
}
