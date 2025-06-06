"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Post } from "@/lib/types";
import ItinerarySummary from "./ItinerarySummary";
import { FileText } from "lucide-react";

type ItinerarySidebarDialogProps = {
    post: Post;
};

const ItinerarySidebarDialog = ({
    post,
}: ItinerarySidebarDialogProps) => {
    const [open, setOpen] = useState(true);

    return (
        <>
            {/* --- ここから変更 --- */}
            {/* ボタンとメッセージのコンテナ */}
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
            {/* --- ここまで変更 --- */}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <ItinerarySummary post={post} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ItinerarySidebarDialog;