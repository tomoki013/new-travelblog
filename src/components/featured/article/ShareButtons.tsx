"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types/types";
import XButton from "@/components/elements/share-buttons/XButton";
import FacebookButton from "@/components/elements/share-buttons/FacebookButton";
import LineButton from "@/components/elements/share-buttons/LineButton";
import CopyLinkButton from "@/components/elements/share-buttons/CopyLinkButton";
import NativeShareButton from "@/components/elements/share-buttons/NativeShareButton";

interface Props {
  post: Post;
  url?: string;
}

const ShareButtons = ({ post, url }: Props) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(url || window.location.href);
  }, [url]);

  if (!currentUrl) {
    return null; // Or a loading state
  }

  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <span className="font-semibold">Share:</span>
      <XButton url={currentUrl} title={post.title} />
      <FacebookButton url={currentUrl} />
      <LineButton url={currentUrl} title={post.title} />
      <CopyLinkButton url={currentUrl} />
      <NativeShareButton
        url={currentUrl}
        title={post.title}
        text={post.excerpt || ""}
      />
    </div>
  );
};

export default ShareButtons;
