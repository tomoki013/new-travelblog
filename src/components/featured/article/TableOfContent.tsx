"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react"; // ▼ アイコンを変更
import { cn } from "@/lib/utils";
import Link from "next/link";

type TableOfContentProps = {
  isScrollSyncEnabled?: boolean;
};

const TableOfContent = ({
  isScrollSyncEnabled = false,
}: TableOfContentProps) => {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const articleElement = document.querySelector("article");
    if (!articleElement) return;

    const headingElements = Array.from(
      articleElement.querySelectorAll("h2, h3")
    );
    const extractedHeadings = headingElements.map((heading, index) => {
      const text = heading.textContent || "";
      const escapedText = text.trim().replace(/\s+/g, "-");
      const id = heading.id || `heading-${escapedText}-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      return {
        id,
        text,
        level: heading.tagName === "H2" ? 2 : 3,
      };
    });
    setHeadings(extractedHeadings);

    if (!isScrollSyncEnabled) {
      setActiveId("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            const activeLink = navRef.current?.querySelector(
              `a[href="#${entry.target.id}"]`
            );
            if (activeLink) {
              activeLink.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "nearest",
              });
            }
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => {
      headingElements.forEach((heading) => observer.unobserve(heading));
    };
  }, [isScrollSyncEnabled]);

  const handleClick = (id: string) => {
    const escapedId = CSS.escape(id);
    document.querySelector(`#${escapedId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <details className="group bg-muted rounded-lg p-6 my-6 border-l-4 border-secondary">
      <summary className="flex cursor-pointer items-center list-none transition-opacity hover:opacity-80">
        <div className="h-5 w-5 text-foreground transition-transform duration-300 group-open:rotate-90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-full w-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <MapPin className="h-5 w-5 text-foreground" />
          <h3 className="text-lg font-bold text-foreground">
            今回の旅程 (目次)
          </h3>
        </div>
      </summary>

      {/* タイムライン形式のナビゲーション (開くと表示される部分) */}
      <nav ref={navRef} className="relative pl-3 pt-4">
        {/* タイムラインの縦線 */}
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-background" />

        {headings.map((heading) => (
          <li key={heading.id} className="list-none my-4">
            <Link
              href={`#${heading.id}`}
              className={cn(
                "group relative flex items-center py-1 text-sm transition-colors",
                activeId === heading.id
                  ? "font-bold text-teal-600"
                  : "font-medium text-foreground hover:text-secondary"
              )}
              onClick={(e) => {
                e.preventDefault();
                handleClick(heading.id);
              }}
            >
              {/* マーカー（● や ○） */}
              <div
                className={cn(
                  "absolute -left-[18.5px] bg-white border-2 rounded-full transition-colors",
                  heading.level === 2
                    ? "w-4 h-4 border-secondary"
                    : "w-3 h-3 border-secondary ml-[2px]",
                  activeId === heading.id && "border-secondary bg-teal-600"
                )}
              />
              <span className={cn(heading.level === 3 && "pl-5")}>
                {heading.text}
              </span>
            </Link>
          </li>
        ))}
      </nav>
    </details>
  );
};

export default TableOfContent;
