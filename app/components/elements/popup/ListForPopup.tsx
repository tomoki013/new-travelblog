'use client';

import { useState, useEffect } from "react";
import ItineraryPopupContent from "./ItineraryPopupContent";
import PhotoGalleryPopupContent from "./PhotoGalleryPopupContent";
import { Post, Photo } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ListForPopupProps {
    items: (Post | Photo)[];
    initialCurrentIndex?: number;

    // allPostsはオプションで、PhotoGalleryPopupContentで使用する
    allPosts?: Post[];
}

const ListForPopup = ({
    items,
    initialCurrentIndex = 0,
    allPosts = [],
}: ListForPopupProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialCurrentIndex);
    
    useEffect(() => {
        setCurrentIndex(initialCurrentIndex);
    }, [initialCurrentIndex]);

    if (!items || items.length === 0) {
        return <p>アイテムが見つかりませんでした。</p>;
    }

    const currentItem = items[currentIndex];

    // 型ガード関数：'slug'プロパティの有無でPost型かどうかを判断
    const isPost = (item: Post | Photo): item is Post => 'slug' in item;

    return (
        <>
            <div className="flex items-center gap-4 w-full justify-center mb-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => currentIndex > 0 && setCurrentIndex(prev => prev - 1)}
                    disabled={currentIndex === 0}
                    aria-label="前のアイテムへ"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-mono w-20 text-center">{currentIndex + 1} / {items.length}</span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => currentIndex < items.length - 1 && setCurrentIndex(prev => prev + 1)}
                    disabled={currentIndex === items.length - 1}
                    aria-label="次のアイテムへ"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            {/* アイテムの型に応じて表示するコンポーネントを切り替える */}
            {isPost(currentItem) ? (
                <ItineraryPopupContent post={currentItem} />
            ) : (
                <PhotoGalleryPopupContent photo={currentItem as Photo} posts={allPosts} />
            )}
        </>
    )
}

export default ListForPopup;
