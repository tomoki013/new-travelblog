
'use client';

import { useEffect, useState } from "react";
import ItineraryPopupContent from "@/app/components/elements/popupContent/ItineraryPopupContent";
import { Post } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LoadingAnimation } from "@/app/components/elements";

const ItineraryListForPopup = () => {
    const [items, setItems] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const res = await fetch(`/api/posts?type=itinerary`);
            if (!res.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await res.json();
            setItems(data.posts as Post[]);
            setIsLoading(false);
        }
        fetchPosts().catch(error => {
            console.error('Error fetching items:', error);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <LoadingAnimation />;
    }
    
    if (items.length === 0) {
        return <p>旅程が見つかりませんでした。</p>
    }

    return (
        <>
            <div className="flex items-center gap-4 w-full justify-center mb-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => currentIndex > 0 && setCurrentIndex(prev => prev - 1)}
                    disabled={currentIndex === 0}
                    aria-label="前の旅程へ"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-mono w-20 text-center">{currentIndex + 1} / {items.length}</span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => currentIndex < items.length - 1 && setCurrentIndex(prev => prev + 1)}
                    disabled={currentIndex === items.length - 1}
                    aria-label="次の旅程へ"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            <ItineraryPopupContent post={(items[currentIndex] as Post)} />
        </>
    )
}

export default ItineraryListForPopup;
