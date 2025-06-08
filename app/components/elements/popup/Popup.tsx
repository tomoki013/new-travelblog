'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import ItineraryPopupContent from '../popupContent/ItineraryPopupContent';
import { Post } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";

interface PopupProps {
    apiFetchType: 'galleryPhotos' | 'posts'
    buttonType?: 'section' | 'button' | 'none'
    initialOpen?: boolean
}

const Popup = ({
    apiFetchType,
    buttonType = 'none',
    initialOpen = false,
}: PopupProps
) => {
    const [items, setItems] = useState<Post[]>([]);
    const [open, setOpen] = useState(initialOpen);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            const endpoint = apiFetchType === 'posts' ? `/api/${apiFetchType}?type=itinerary` : `/api/${apiFetchType}`;
            const res = await fetch(endpoint);
            if (!res.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await res.json();
            const popupItems = apiFetchType === 'posts' ? data.posts : data;
            setItems(popupItems);
        }
        fetchPosts().catch(error => {
            console.error('Error fetching items:', error);
        });
    }, [apiFetchType]);

    return (
        <>
            {/* セクション風誘導アイテム */}
            {buttonType === 'section' && (
                <Card 
                    className="mb-8 w-full cursor-pointer hover:shadow-lg transition-shadow bg-secondary/50"
                    onClick={() => {
                        setOpen(true);
                        setCurrentIndex(0);
                    }}
                >
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <FileText className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">旅の概要をまとめてチェック</h2>
                                    <p className="text-muted-foreground">クリックして全ての旅程と費用の概要をモーダルで確認できます。</p>
                                </div>
                            </div>
                            <Button className="cursor-pointer">
                                <span>一覧で見る</span>
                                <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
            )}

            {/* 画面固定ボタン風誘導アイテム */}
            {buttonType === 'button' && (
                <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2">
                    {/* 吹き出し風メッセージ */}
                    <div className="bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-semibold shadow-lg animate-bounce">
                        <p>概要はここをクリック！</p>
                    </div>
                    {/* フローティングボタン */}
                    <Button
                        onClick={() => setOpen(true)}
                        className="rounded-full shadow-lg h-16 w-auto px-6 flex items-center justify-center gap-2 text-base cursor-pointer"
                        aria-label="旅の概要を見る"
                    >
                        <FileText className="h-6 w-6" />
                        <span>旅の概要</span>
                    </Button>
                </div>
            )}

            {/* ボタン無 */}
            {buttonType === 'none' && (
                <p className='hidden'></p>
            )}

            <Dialog open={open} onOpenChange={(v) => {
                setOpen(v);
                if (!v) setCurrentIndex(0);
            }}>
                <DialogContent className="max-h-[90vh] overflow-y-auto flex flex-col items-center">
                    {items?.length > 0 && (
                        <>
                             <DialogTitle className="text-xl font-bold mb-2">旅の概要 ({currentIndex + 1} / {items.length})</DialogTitle>
                             <DialogDescription>左右の矢印で他の旅程に切り替えられます。</DialogDescription>
                            <div className="flex items-center gap-4 w-full justify-center mt-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => currentIndex > 0 && setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                    disabled={currentIndex === 0}
                                    aria-label="前の旅程へ"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-lg font-mono w-20 text-center">{currentIndex + 1} / {items.length}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => currentIndex < items.length - 1 && setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1))}
                                    disabled={currentIndex === items.length - 1}
                                    aria-label="次の旅程へ"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <ItineraryPopupContent post={items[currentIndex]} />
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Popup;
