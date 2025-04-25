import { NextResponse } from 'next/server';
import citiesData from '../../../public/data/cities/cities.json';
import fs from 'fs';
import path from 'path';

// JSONデータの型定義
interface City {
    name: string;
    timeZone: string;
    country: string;
}

export async function GET() {
    try {
        // JSONデータを名前で昇順にソートし、東京を最初に配置
        const sortedCities = (citiesData as City[])
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort((a, b) => (a.name === "東京" ? -1 : b.name === "東京" ? 1 : 0));
        return NextResponse.json(sortedCities);
    } catch (error) {
        console.error("Failed to load cities from JSON:", error);
        return NextResponse.json({ error: "Failed to load cities" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const newCity = await req.json() as City; // 型アサーションを追加
        const cities = citiesData as City[]; // citiesData に型アサーションを追加

        const updatedCities = [...cities, newCity];

        const filePath = path.join(process.cwd(), 'public', 'data', 'cities', 'cities.json');
        fs.writeFileSync(filePath, JSON.stringify(updatedCities, null, 2), 'utf-8');

        return NextResponse.json(newCity, { status: 201 });
    } catch (error) {
        console.error("Failed to add new city:", error);
        return NextResponse.json({ error: "Failed to add new city" }, { status: 500 });
    }
}
