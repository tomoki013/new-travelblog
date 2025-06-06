"use client"

import { useEffect, useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Search } from 'lucide-react';
import WorldClock from './worldClock/WorldClock';
import * as Elements from '@/app/components/elements/index';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface City {
    name: string;
    country: string;
    timeZone: string;
    region: string;
}

const getTimeZoneOffset = (timeZone: string): number => {
    try {
        const date = new Date();
        const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
        return (tzDate.getTime() - utcDate.getTime()) / 36e5;
    } catch {
        console.error(`Invalid timeZone: ${timeZone}`);
        return 0;
    }
};

const regions = ['すべて', 'アジア', 'ヨーロッパ', '北米', '南米', 'オセアニア', 'アフリカ'];

const WorldClockClient = () => {
    const [allCities, setAllCities] = useState<City[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [comparisonBaseCity, setComparisonBaseCity] = useState<City | null>(null);

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/cities');
                const data: City[] = await response.json();
                setAllCities(data);
                const tokyo = data.find((city: City) => city.name === "東京");
                if (tokyo) {
                    setComparisonBaseCity(tokyo);
                }
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCities();
    }, []);

    const searchedCities = useMemo(() => {
        if (!searchQuery) {
            return allCities;
        }
        return allCities.filter(city =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            city.country.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allCities]);

    const handleBaseCityChange = (cityName: string) => {
        const newBaseCity = allCities.find(c => c.name === cityName);
        if (newBaseCity) {
            setComparisonBaseCity(newBaseCity);
        }
    };

    const renderCityList = (citiesToRender: City[]) => (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {citiesToRender.length > 0 ? citiesToRender.map(city => {
                const timeDifference = comparisonBaseCity && city.name !== comparisonBaseCity.name
                    ? getTimeZoneOffset(city.timeZone) - getTimeZoneOffset(comparisonBaseCity.timeZone)
                    : null;

                return (
                    <Card key={city.name} className="p-0 flex flex-col">
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="flex items-start justify-between mb-2">
                                <h2 className="text-xl font-bold">{city.name}</h2>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <MapPin className="mr-1 h-4 w-4" />
                                {city.country}
                            </div>
                            <div className="mt-auto">
                                <WorldClock name={city.name} timeZone={city.timeZone} />
                                {timeDifference !== null && (
                                    <div className="text-center text-sm text-muted-foreground mt-2 border-t pt-2">
                                        {comparisonBaseCity?.name}との時差: 
                                        <span className="font-bold ml-1">{timeDifference >= 0 ? '+' : ''}{timeDifference.toFixed(1)}時間</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                );
            }) : <p className="text-center col-span-full text-muted-foreground">該当する都市はありません。</p>}
        </div>
    );

    return (
        <>
            <div className="mb-8 grid gap-4 md:grid-cols-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="都市名や国名で検索..."
                        className="w-full pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div>
                    <Select
                        value={comparisonBaseCity?.name}
                        onValueChange={handleBaseCityChange}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="基準都市を選択..." />
                        </SelectTrigger>
                        <SelectContent>
                             {allCities.map(city => (
                                <SelectItem key={city.name} value={city.name}>
                                    {city.name} ({city.country})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="mb-12">
                <p className="text-muted-foreground text-sm">各都市の時刻と、選択した基準都市との時差を表示しています。</p>
            </div>

            {isLoading ? (
                <Elements.LoadingAnimation />
            ) : (
                <Tabs defaultValue="すべて" className="mb-10">
                    <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-7 h-auto">
                        {regions.map(region => (
                            <TabsTrigger key={region} value={region}>
                                {region}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {regions.map(region => (
                        <TabsContent key={region} value={region}>
                            {renderCityList(searchedCities.filter(city => region === 'すべて' || city.region === region))}
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </>
    );
};

export default WorldClockClient;
