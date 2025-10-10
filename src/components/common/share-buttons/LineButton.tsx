"use client";

import { FaLine } from "react-icons/fa";

interface Props {
  url: string;
  title: string;
}

const LineButton = ({ url, title }: Props) => {
  const shareOnLine = () => {
    const text = encodeURIComponent(title);
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${shareUrl}&text=${text}`
    );
  };

  return (
    <button
      onClick={shareOnLine}
      className="p-3 rounded-full text-foreground bg-primary-foreground hover:bg-gray-200 transition-colors"
      aria-label="Share on LINE"
    >
      <FaLine size={20} />
    </button>
  );
};

export default LineButton;
