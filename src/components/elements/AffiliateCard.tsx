"use client";

import Image from "next/image";
import Link from "next/link";
import { AffiliatesProps } from "@/types/types";

type AffiliateCardProps = {
  affiliate: AffiliatesProps;
  type?: "link" | "card" | "banner";
};

const AffiliateCard = ({ affiliate, type = "link" }: AffiliateCardProps) => {
  const { affiliateUrl, name, description, icon, image, bannerHtml } =
    affiliate;

  const renderContent = () => {
    switch (type) {
      case "link":
        return (
          <Link
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {name}
          </Link>
        );
      case "card":
        return (
          <Link
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col items-center text-center"
          >
            <div className="mb-4 h-12 w-12 flex items-center justify-center">
              {image ? (
                <Image
                  src={image}
                  alt={`${name} ロゴ`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              ) : (
                icon
              )}
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{name}</h3>
            <p className="text-muted-foreground flex-grow">{description}</p>
          </Link>
        );
      case "banner":
        if (!bannerHtml) return null;
        return (
          <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden">
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: bannerHtml }}
            />
            <div className="p-4">
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default AffiliateCard;
