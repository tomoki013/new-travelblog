"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

interface Props {
  url: string;
}

const CopyLinkButton = ({ url }: Props) => {
  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("クリップボードにコピーしました");
    });
  };

  return (
    <button
      onClick={copyUrlToClipboard}
      className="p-3 rounded-full text-foreground bg-primary-foreground hover:bg-gray-200 transition-colors relative"
      aria-label="Copy link"
    >
      <Copy size={20} />
    </button>
  );
};

export default CopyLinkButton;
