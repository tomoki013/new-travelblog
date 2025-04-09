"use client"

import { useState, useEffect } from 'react'
import { Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link';

const TableOfContents = () => {

    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
    const [activeId, setActiveId] = useState<string>("")

    useEffect(() => {
        const articleElement = document.querySelector("article")
        if (!articleElement) return

        const headingElements = Array.from(articleElement.querySelectorAll("h2, h3"))
        const extractedHeadings = headingElements.map((heading, index) => {
            const text = heading.textContent || "";
            const escapedText = text.trim().replace(/\s+/g, "-"); // 修正: trimで余計な空白を削除し、空白をハイフンに変換
            return {
                id: heading.id || `heading-${escapedText}-${index}`, // 修正: ユニークなidを生成
                text,
                level: heading.tagName === "H2" ? 2 : 3,
            };
        })
        setHeadings(extractedHeadings)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: "-20% 0% -35% 0%",
            }
        )

        headingElements.forEach((heading) => observer.observe(heading))

        return () => {
            headingElements.forEach((heading) => observer.unobserve(heading))
        }
    }, [])

    const handleClick = (id: string) => {
        const escapedId = CSS.escape(id)
        document.querySelector(`#${escapedId}`)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        })
    }

    if (headings.length === 0) {
        return null
    }

    return (
        <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
                <Link2 className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-medium">目次</h3>
            </div>
            <nav className="space-y-1">
                {headings.map((heading) => (
                    <Link
                        key={heading.id} // 修正済み: idが空の場合も一意な値を使用
                        href={`#${heading.id}`}
                        className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                            heading.level === 3 && "pl-6",
                            activeId === heading.id
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            handleClick(heading.id)
                        }}
                    >
                        <span className="relative">
                            {heading.text}
                            <span
                                className={cn(
                                "absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-300",
                                activeId === heading.id && "scale-x-100"
                                )}
                            />
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default TableOfContents
