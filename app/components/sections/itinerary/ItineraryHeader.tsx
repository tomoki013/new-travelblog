'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react"
import ItinerarySummary from "./ItinerarySummary";
import { Post } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
            <Button
                onClick={() => {
                    setOpen(true);
                    setCurrentIndex(0);
                }}
            >
                <span>旅の概要を一覧で見る</span>
            </Button>
            <Dialog open={open} onOpenChange={(v) => {
                setOpen(v);
                if (!v) setCurrentIndex(0);
            }}>
                <DialogContent className="max-h-[90vh] overflow-y-auto flex flex-col items-center">
                    {posts.length > 0 && (
                        <>
                            <div className="flex gap-4">
                                <span
                                    onClick={() => currentIndex > 0 && setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                    className={`h-8 w-8 flex items-center justify-center rounded border border-input bg-background shadow-sm transition-colors cursor-pointer ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent hover:text-accent-foreground'}`}
                                    style={{ pointerEvents: currentIndex === 0 ? 'none' : 'auto' }}
                                    aria-disabled={currentIndex === 0}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </span>
                                <span>{currentIndex + 1} / {posts.length}</span>
                                <span
                                    onClick={() => currentIndex < posts.length - 1 && setCurrentIndex((prev) => Math.min(prev + 1, posts.length - 1))}
                                    className={`h-8 w-8 flex items-center justify-center rounded border border-input bg-background shadow-sm transition-colors cursor-pointer ${currentIndex === posts.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent hover:text-accent-foreground'}`}
                                    style={{ pointerEvents: currentIndex === posts.length - 1 ? 'none' : 'auto' }}
                                    aria-disabled={currentIndex === posts.length - 1}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </span>
                            </div>
                            <ItinerarySummary post={posts[currentIndex]} />
                            <div className="flex gap-4">
                                <span
                                    onClick={() => currentIndex > 0 && setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                    className={`h-8 w-8 flex items-center justify-center rounded border border-input bg-background shadow-sm transition-colors cursor-pointer ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent hover:text-accent-foreground'}`}
                                    style={{ pointerEvents: currentIndex === 0 ? 'none' : 'auto' }}
                                    aria-disabled={currentIndex === 0}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </span>
                                <span>{currentIndex + 1} / {posts.length}</span>
                                <span
                                    onClick={() => currentIndex < posts.length - 1 && setCurrentIndex((prev) => Math.min(prev + 1, posts.length - 1))}
                                    className={`h-8 w-8 flex items-center justify-center rounded border border-input bg-background shadow-sm transition-colors cursor-pointer ${currentIndex === posts.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent hover:text-accent-foreground'}`}
                                    style={{ pointerEvents: currentIndex === posts.length - 1 ? 'none' : 'auto' }}
                                    aria-disabled={currentIndex === posts.length - 1}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </span>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ItineraryHeader;
