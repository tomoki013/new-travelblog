"use client";

import { useEffect, useState } from "react";
import { FiShare } from "react-icons/fi";

interface Props {
  url: string;
  title: string;
  text: string;
}

const NativeShareButton = ({ url, title, text }: Props) => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (navigator.share) {
      setIsSupported(true);
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={handleShare}
      className="p-3 rounded-full text-foreground bg-primary-foreground hover:bg-gray-200 transition-colors"
      aria-label="Share"
    >
      <FiShare size={20} />
    </button>
  );
};

export default NativeShareButton;
