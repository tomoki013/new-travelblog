'use client';

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { Compass } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import Posts from "@/app/components/sections/posts/posts"

interface Destination {
    name: string
    image: string
    description: string
    region: string
    season: string
    highlights: string[]
}

const destinations: Destination[] = [
    {
        name: 'パリ（フランス）',
        image: '/images/France/eiffel-tower-4.jpg',
        description: 'パリ',
        region: 'ヨーロッパ',
        season: '夏',
        highlights: ['エッフェル塔', '凱旋門', 'セーヌ川', 'ルーブル美術館']
    },
    {
        name: 'マドリード（スペイン）',
        image: '/images/Spain/plaza-mayor-1.jpg',
        description: 'マドリード',
        region: 'ヨーロッパ',
        season: '夏・冬',
        highlights: ['マヨール広場', 'サンミゲル市場', 'ラスベンタス闘牛場']
    },
    {
        name: 'バンコク（タイ）',
        image: '/images/Thai/wat-arun-3.jpg',
        description: 'バンコク',
        region: '東南アジア',
        season: '夏',
        highlights: ['ワット・アルン', 'ワット・ポー', 'ワット・プラケオ']
    },
    {
        name: 'トレド（スペイン）',
        image: '/images/Spain/toledo-view-1.jpg',
        description: 'トレド',
        region: 'ヨーロッパ',
        season: '夏・冬',
        highlights: ['旧市街', 'ジップライン', 'トレド大聖堂']
    },
    {
        name: 'バルセロナ（スペイン）',
        image: '/images/Spain/sagrada-familia-1.jpg',
        description: 'バルセロナ',
        region: 'ヨーロッパ',
        season: '夏・冬',
        highlights: ['サグラダファミリア', 'カサミラ', 'カサバトリョ', 'カタルーニャ音楽堂']
    },
    {
        name: 'ブリュッセル（ベルギー）',
        image: '/images/Belgium/galeries-royales-saint-hubert.jpg',
        description: 'ブリュッセル',
        region: 'ヨーロッパ',
        season: '夏・冬',
        highlights: ['ギャルリ・サンテュベール', 'サン・ミッシェル大聖堂', 'グランプラス']
    },
    {
        name: 'アグラ（インド）',
        image: '/images/India/tajmahal.jpg',
        description: 'アグラ',
        region: '中央アジア',
        season: '夏',
        highlights: ['タージマハル', 'アグラ城跡']
    },
    {
        name: 'デリー（インド）',
        image: '/images/India/indian-gate-1.jpg',
        description: 'デリー',
        region: '中央アジア',
        season: '夏',
        highlights: ['インド門', 'ロータス寺院', 'アグラーセン・キ・バオリ', 'レッドフォート', 'フユマーン廟']
    },
    {
        name: 'ジャイプル（インド）',
        image: '/images/India/pink-city-1.jpg',
        description: 'ジャイプル',
        region: '中央アジア',
        season: '夏',
        highlights: ['ピンクシティ', 'ハワーマハル', 'アンベール城', 'ジャル・マハル']
    },
    {
        name: 'バラナシ（インド）',
        image: '/images/India/festival-2.jpg',
        description: 'バラナシ',
        region: '中央アジア',
        season: '夏',
        highlights: ['ガンジス川', 'ガンジス川のお祭り', '火葬場']
    },
]

const Roulette = () => {
    const [spinning, setSpinning] = useState(false)
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
    const [selectedOptions, setSelectedOptions] = useState<string[]>(destinations.map(d => d.name))
    const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const spinRoulette = () => {
        if (spinning || selectedOptions.length === 0) return;

        setSpinning(true)
        setSelectedDestination(null)

        // ランダムな時間（2〜4秒）後に結果を表示
        const spinDuration = 2000 + Math.random() * 2000
        
        if (spinTimeoutRef.current) {
            clearTimeout(spinTimeoutRef.current)
        }

        spinTimeoutRef.current = setTimeout(() => {
            const availableDestinations = destinations.filter(d => selectedOptions.includes(d.name))
            const randomIndex = Math.floor(Math.random() * availableDestinations.length)
            setSelectedDestination(availableDestinations[randomIndex])
            setSpinning(false)
        }, spinDuration)
    }
    
    const toggleDestination = (name: string) => {
        setSelectedOptions(prev => {
            if (prev.includes(name)) {
                return prev.filter(d => d !== name)
            } else {
                return [...prev, name]
            }
        })
    }
    return(
        <>
            <div className="mx-auto mb-8 max-w-2xl">
                <div className="mb-6 rounded-lg border bg-card p-4">
                    <details className="text-xl font-bold">
                        <summary>行き先の選択</summary>
                        <p className="mb-4 text-sm text-muted-foreground">
                            ルーレットに含める行き先を選択してください。少なくとも1つは選択する必要があります。
                        </p>
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                            {destinations.map((destination) => (
                                <div key={destination.name} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={destination.name}
                                        checked={selectedOptions.includes(destination.name)}
                                        onCheckedChange={() => toggleDestination(destination.name)}
                                    />
                                    <label
                                        htmlFor={destination.name}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                            {destination.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </details>
                </div>
            </div>
            <div className="mx-auto mb-12 max-w-2xl">
                <div className="relative aspect-square overflow-hidden rounded-full border-8 border-primary/20">
                    <AnimatePresence>
                        {spinning ? (
                            <motion.div
                                className='absolute inset-0 flex items-center justify-center bg-black/60'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="text-3xl font-bold text-white"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Compass className="h-16 w-16" />
                                </motion.div>
                            </motion.div>
                        ) : (
                            selectedDestination && (
                                <motion.div
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ type: 'spring', duration: 0.5 }}
                                >
                                    <Image
                                        src={selectedDestination.image}
                                        alt={selectedDestination.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <div className="text-center text-white">
                                            <h2 className="mb-2 text-4xl font-bold">{selectedDestination.name}</h2>
                                            <p className="text-lg">{selectedDestination.region}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 text-center">
                    <Button size="lg" onClick={spinRoulette} disabled={spinning}>
                        {spinning ? 'ルーレット回転中...' : 'ルーレットを回す'}
                    </Button>
                </div>
            </div>

            {selectedDestination && (
                <Posts
                    type='tourism'
                    filter='region'
                    filterItem={selectedDestination.name.split('（')[0]} // '（'以降を削除
                    inputClassName="hidden"
                    tabListClassName="hidden"
                />
            )}
        </>
    );
}

export default Roulette;
