"use client";

import { FaXTwitter } from "react-icons/fa6";

interface Props {
  url: string;
  title: string;
}

const XButton = ({ url, title }: Props) => {
  const shareOnX = () => {
    const text = encodeURIComponent(`${title} | ともきちの旅行日記`);
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`
    );
  };

  return (
    <button
      onClick={shareOnX}
      className="p-3 rounded-full text-foreground bg-primary-foreground hover:bg-gray-200 transition-colors"
      aria-label="Share on X"
    >
      <FaXTwitter size={20} />
    </button>
  );
};

export default XButton;
