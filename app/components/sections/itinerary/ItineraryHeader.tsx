'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import ItinerarySummary from "./ItinerarySummary";
import { Post } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";

const ItineraryHeader = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            const endpoint = `/api/posts?type=itinerary`;
            const res = await fetch(endpoint);
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await res.json();
            const posts = data.posts;
            setPosts(posts);
        }
        fetchPosts().catch(error => {
            console.error('Error fetching posts:', error);
        });
    }, []);

    return (
        <>
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

            <Dialog open={open} onOpenChange={(v) => {
                setOpen(v);
                if (!v) setCurrentIndex(0);
            }}>
                <DialogContent className="max-h-[90vh] overflow-y-auto flex flex-col items-center">
                    {posts.length > 0 && (
                        <>
                             <DialogTitle className="text-xl font-bold mb-2">旅の概要 ({currentIndex + 1} / {posts.length})</DialogTitle>
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
                                <span className="text-lg font-mono w-20 text-center">{currentIndex + 1} / {posts.length}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => currentIndex < posts.length - 1 && setCurrentIndex((prev) => Math.min(prev + 1, posts.length - 1))}
                                    disabled={currentIndex === posts.length - 1}
                                    aria-label="次の旅程へ"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <ItinerarySummary post={posts[currentIndex]} />
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ItineraryHeader;
