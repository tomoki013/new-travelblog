"use client";

import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import * as Sections from "@/app/components/sections/index";
import { Post } from "@/lib/types";

type ItinerarySidebarDialogProps = {
    post: Post;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function ItinerarySidebarDialog({ post, open, setOpen }: ItinerarySidebarDialogProps) {
    useEffect(() => {
        if (open) setOpen(true);
    }, [open, setOpen]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <Sections.ItinerarySidebar post={post} />
            </DialogContent>
        </Dialog>
    );
}
