import Link from "next/link";
import Image from "next/image";
import { Link as LinkIcon } from "lucide-react";

interface LinkCardProps {
  href: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  variant: "standard" | "analog" | "minimal";
}

export const LinkCard: React.FC<LinkCardProps> = ({
  href,
  title,
  excerpt,
  imageUrl,
  variant,
}) => {
  const domain = new URL(href, "https://tomokichidiary.netlify.app").hostname;

  // ===== スタンダード型 =====
  if (variant === "standard") {
    return (
      <Link
        href={href}
        className="group flex items-center gap-4 my-6 p-4 bg-white/80 border border-gray-200 rounded-lg transition-colors shadow-sm"
      >
        {imageUrl && (
          <div className="w-1/4 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={300}
              className="rounded-md object-cover aspect-video"
            />
          </div>
        )}
        <div className="flex-grow">
          <h4 className="font-bold text-foreground group-hover:text-muted-foreground">
            {title}
          </h4>
          {excerpt && (
            <p className="text-sm text-foreground mt-1 line-clamp-2 group-hover:text-muted-foreground">
              {excerpt}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <LinkIcon size={12} /> {domain + href}
          </p>
        </div>
      </Link>
    );
  }

  // ===== アナログ・日記風 =====
  if (variant === "analog") {
    return (
      <Link
        href={href}
        className="group block my-8 hover:!rotate-0 transition-transform duration-300"
        style={{ transform: `rotate(${Math.random() * 2 - 1}deg)` }}
      >
        <div className="bg-white p-3 pb-8 rounded-md shadow-lg relative">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={600}
              className="rounded-sm object-cover aspect-[4/3] border-2 border-gray-100"
            />
          )}
          <h4 className="font-serif font-semibold text-center mt-3 text-foreground absolute bottom-2 left-0 right-0">
            {title}
          </h4>
        </div>
      </Link>
    );
  }

  // ===== ミニマル・コンパクト型 =====
  if (variant === "minimal") {
    return (
      <Link
        href={href}
        className="group block my-4 p-4 border-l-4 border-secondary bg-white/80 transition-colors"
      >
        <h4 className="font-bold text-foreground group-hover:text-muted-foreground">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <LinkIcon size={12} /> {domain + href}
        </p>
      </Link>
    );
  }

  return null;
};
