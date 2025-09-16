"use client";

import { FaFacebook } from "react-icons/fa";

interface Props {
  url: string;
}

const FacebookButton = ({ url }: Props) => {
  const shareOnFacebook = () => {
    const shareUrl = encodeURIComponent(url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
  };

  return (
    <button
      onClick={shareOnFacebook}
      className="p-3 rounded-full text-foreground bg-primary-foreground hover:bg-gray-200 transition-colors"
      aria-label="Share on Facebook"
    >
      <FaFacebook size={20} />
    </button>
  );
};

export default FacebookButton;
