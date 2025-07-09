'use client';

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { Compass } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { regions, regionProps } from "@/data/regions";
import * as Sections from "@/app/components/sections/index";

const Roulette = () => {
    const [spinning, setSpinning] = useState(false)
    const [selectedDestination, setSelectedDestination] = useState<regionProps | null>(null)
    const [selectedOptions, setSelectedOptions] = useState<string[]>(regions.map(d => d.city))
    const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const postsRef = useRef<HTMLDivElement | null>(null)

    const spinRoulette = () => {
        if (spinning || selectedOptions.length === 0) return;

        setSpinning(true)
        setSelectedDestination(null)

        const spinDuration = 2000 + Math.random() * 2000

        if (spinTimeoutRef.current) {
            clearTimeout(spinTimeoutRef.current)
        }

        spinTimeoutRef.current = setTimeout(() => {
            const availableDestinations = regions.filter(d => selectedOptions.includes(d.city))
            const randomIndex = Math.floor(Math.random() * availableDestinations.length)
            setSelectedDestination(availableDestinations[randomIndex])
            setSpinning(false)
            // ルーレットが止まった後にスクロール
            setTimeout(() => {
                postsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100) // Postsが描画されるタイミングに合わせて少し遅延
        }, spinDuration)
    }
    
    const toggleDestination = (city: string) => {
        setSelectedOptions(prev => {
            if (prev.includes(city)) {
                return prev.filter(d => d !== city)
            } else {
                return [...prev, city]
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
                            {regions.map((region) => (
                                <div key={region.city} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={region.city}
                                        checked={selectedOptions.includes(region.city)}
                                        onCheckedChange={() => toggleDestination(region.city)}
                                    />
                                    <label
                                        htmlFor={region.city}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                            {region.city}
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
                                <Image
                                    src="favicon.ico"
                                    alt="ルーレット"
                                    fill
                                    className="h-16 w-16"
                                />
                                <motion.div
                                    className="text-3xl font-bold text-black"
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
                                        src={selectedDestination.images[0]}
                                        alt={selectedDestination.city}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <div className="text-center text-white">
                                            <h2 className="mb-2 text-4xl font-bold">{selectedDestination.city}</h2>
                                            <p className="text-lg">{selectedDestination.country}</p>
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
                <div ref={postsRef}>
                    <Sections.Posts
                        apiFetchType="tourism"
                        showSearchInput={false}
                        showCategoryTabs={false}
                        specificFilterType="region"
                        specificFilterValue={selectedDestination.city}
                    />
                </div>
            )}
        </>
    );
}

export default Roulette;
