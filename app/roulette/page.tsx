"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
// import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Compass } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
// import { Card, CardContent } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { MapPin, Calendar, Compass } from 'lucide-react'
// import getAllPosts from '@/lib/markdown'

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
        name: 'パリ',
        image: '/images/France/eiffel-tower-4.jpg',
        description: 'パリ',
        region: 'ヨーロッパ',
        season: '夏',
        highlights: ['エッフェル塔', '凱旋門', 'セーヌ川', 'ルーブル美術館']
    },
    {
        name: 'トレド',
        image: '/images/Spain/toledo-view-1.jpg',
        description: 'トレド',
        region: 'ヨーロッパ',
        season: '夏・冬',
        highlights: ['旧市街', 'ジップライン', 'トレド大聖堂']
    },
    {
        name: 'バルセロナ',
        image: '/images/Spain/sagrada-familia-1.jpg',
        description: 'バルセロナ',
        region: 'ヨーロッパ',
        season: '夏・冬',
        highlights: ['サグラダファミリア', 'カサミラ', 'カサバトリョ', 'カタルーニャ音楽堂']
    },
    {
        name: 'マドリード',
        image: '/images/Spain/plaza-mayor-1.jpg',
        description: 'マドリード',
        region: 'ヨーロッパ',
        season: '夏・冬',
        highlights: ['マヨール広場', 'サンミゲル市場', 'ラスベンタス闘牛場']
    },
    {
        name: 'バンコク',
        image: '/images/Thai/wat-arun-3.jpg',
        description: 'バンコク',
        region: '東南アジア',
        season: '夏',
        highlights: ['ワット・アルン', 'ワット・ポー', 'ワット・プラケオ']
    },
    {
        name: 'バラナシ',
        image: '/images/India/festival-2.jpg',
        description: 'バラナシ',
        region: '中央アジア',
        season: '夏',
        highlights: ['ガンジス川', 'ガンジス川のお祭り', '火葬場']
    },
]

const RoulettePage = () => {
    const [spinning, setSpinning] = useState(false)
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
    // const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
    const [selectedOptions, setSelectedOptions] = useState<string[]>(destinations.map(d => d.name))
    const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // useEffect(() => {
    //     if (selectedDestination) {
    //         const posts = getAllPosts('diary').concat(getAllPosts('tourism'))
    //         const related = posts.filter(post => 
    //             post.title.toLowerCase().includes(selectedDestination.name.toLowerCase()) ||
    //             post.location.toLowerCase().includes(selectedDestination.name.toLowerCase())
    //         ).slice(0, 3)
    //         setRelatedPosts(related)
    //     }
    // }, [selectedDestination])

    const spinRoulette = () => {
        if (spinning || selectedOptions.length === 0) return

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

    return (
        <div className="container py-12">
            <div className='container border bg-card rounded-md w-fit mx-auto p-2 mb-4'>
                <p className='mx-auto max-w-2xl text-muted-foreground'>
                    海外旅行に出発する前には、
                    <Link className='underline text-blue-500' href="https://www.anzen.mofa.go.jp/">
                        外務省の海外安全ホームページ
                    </Link>
                    を必ず確認し、最新の渡航情報を把握してください。現地の治安状況や危険情報を確認し、安全対策を講じることが重要です。また、旅行保険の加入や予防接種の確認も忘れずに行いましょう。安全第一で、万全の準備を整えてください。
                </p>
            </div>
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">旅行先ルーレット</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    行き先に迷ったら、ルーレットを回して運命の旅行先を見つけましょう！
                    選ばれた場所に関連する情報や記事もご紹介します。
                </p>
            </div>

            <div className="mx-auto mb-8 max-w-2xl">
                <div className="mb-6 rounded-lg border bg-card p-4">
                    <details className="text-xl font-bold" open>
                        <summary>行き先の選択</summary>
                        <p className="mb-4 text-sm text-muted-foreground">
                          ルーレットに含める行き先を選択してください。少なくとも1つは選択する必要があります。
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
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
                                className="absolute inset-0 flex items-center justify-center bg-black/60"
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
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", duration: 0.5 }}
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
                    
                {/* {selectedDestination && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="mb-12 rounded-xl bg-muted p-8">
                        <h2 className="mb-6 text-2xl font-bold">{selectedDestination.name}について</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="mb-4 text-lg">{selectedDestination.description}</p>
                                <div className="mb-4">
                                    <Badge className="mr-2">おすすめシーズン: {selectedDestination.season}</Badge>
                                    <Badge variant="outline">{selectedDestination.region}</Badge>
                                </div>
                                <h3 className="mb-2 text-lg font-medium">主な観光スポット</h3>
                                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                                    {selectedDestination.highlights.map((spot) => (
                                        <li key={spot}>{spot}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 text-lg font-medium">関連する記事</h3>
                                <div className="space-y-4">
                                    {relatedPosts.length > 0 ? (
                                        relatedPosts.map((post) => (
                                            <Card key={post.slug}>
                                                <CardContent className="flex gap-4 p-4">
                                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                                                        <Image
                                                            src={post.image}
                                                            alt={post.title}
                                                            fill
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="mb-1 font-medium">
                                                            <Link 
                                                                href={`/${post.category === '観光スポット' ? 'tourism' : 'diary'}/${post.slug}`}
                                                                className="hover:underline"
                                                            >
                                                                {post.title}
                                                            </Link>
                                                        </h4>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <span className="flex items-center">
                                                                <Calendar className="mr-1 h-3 w-3" />
                                                                {post.date}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <MapPin className="mr-1 h-3 w-3" />
                                                                {post.location}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <p className="text-center text-muted-foreground">
                                            関連する記事が見つかりませんでした。
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )} */}
        </div>
    );
}

export default RoulettePage;
