"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Post } from "@/lib/types";
import ItinerarySummary from "./ItinerarySummary";

type ItinerarySidebarDialogProps = {
    post: Post;
};

const ItinerarySidebarDialog = ({ post }: ItinerarySidebarDialogProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="mb-4 text-right">
                <Button onClick={() => setOpen(true)}>旅の概要を見る</Button>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <ItinerarySummary post={post} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ItinerarySidebarDialog;
