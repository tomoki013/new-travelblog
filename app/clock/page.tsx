"use client"

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';
import WorldClock from './worldClock/WorldClock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as Elements from '@/app/components/elements/index';

const WorldClockPage = () => {
    interface City {
        name: string;
        country: string;
        timeZone: string;
        region: string; // 地域を追加
    }

    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true);
            const response = await fetch('/api/cities');
            const data = await response.json();
            setCities(data);
            setLoading(false);
        };

        fetchCities();
    }, []);

    const regions = ['すべて', 'アジア', 'ヨーロッパ', '北米', '南米', 'オセアニア', 'アフリカ']; // タブのリスト

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">世界の時刻</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    世界各地の現地時刻をリアルタイムで確認できます。旅行の計画や、海外の友人との連絡に便利にお使いください。
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Elements.LoadingAnimation />
                </div>
            ) : (
                <Tabs defaultValue="すべて" className="mb-10">
                    <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-7 h-auto">
                        {regions.map(region => (
                            <TabsTrigger key={region} value={region}>
                                {region}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* タブコンテンツ */}
                    {regions.map(region => (
                        <TabsContent key={region} value={region}>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {cities
                                    .filter(city => region === 'すべて' || city.region === region)
                                    .map(city => (
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
                                {cities.filter(city => region === 'すべて' || city.region === region).length === 0 && (
                                    <p className="text-center col-span-full">該当する都市がありません。</p>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    );
};

export default WorldClockPage;
