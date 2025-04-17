"use client"

import { Card } from '@/components/ui/card'
import { Clock, MapPin } from 'lucide-react'
import WorldClock from './worldClock/WorldClock';

const WorldClockPage = () => {
    const cities = [
        { name: '東京', timeZone: 'Asia/Tokyo', country: '日本' },
        { name: 'ニューヨーク', timeZone: 'America/New_York', country: 'アメリカ' },
        { name: 'ロンドン', timeZone: 'Europe/London', country: 'イギリス' },
        { name: 'パリ', timeZone: 'Europe/Paris', country: 'フランス' },
        { name: 'シドニー', timeZone: 'Australia/Sydney', country: 'オーストラリア' },
        { name: 'シンガポール', timeZone: 'Asia/Singapore', country: 'シンガポール' },
        { name: 'ドバイ', timeZone: 'Asia/Dubai', country: 'UAE' },
        { name: 'バンコク', timeZone: 'Asia/Bangkok', country: 'タイ' },
    ]

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">世界の時刻</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    世界各地の現地時刻をリアルタイムで確認できます。旅行の計画や、海外の友人との連絡に便利にお使いください。
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {cities.map((city) => (
                    <Card key={city.name} className="overflow-hidden">
                        <div className="relative">
                            <div className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        <h2 className="text-xl font-bold">{city.name}</h2>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="mr-1 h-4 w-4" />
                                        {city.country}
                                    </div>
                                </div>
                                <WorldClock name={city.name} timeZone={city.timeZone} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default WorldClockPage
