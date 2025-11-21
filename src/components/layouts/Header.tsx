"use client";

import { MenuIcon, XIcon } from "@/components/common/Icons";
import { NAV_LINKS } from "@/constants/navigation";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ModeToggle from "../common/mode-toggle";
import SearchOverlay from "../features/search/SearchOverlay";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // スクロール検知の閾値を少し深めに設定し、Hero画像内での体験を安定させる
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ... (スクロールロックやクリック外判定のuseEffectは変更なし) ...
  useEffect(() => {
    if (isSearchOpen || isMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isSearchOpen, isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, closeMenu]);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // 透過状態かどうか
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "top-0 z-50 w-full transition-all duration-500 ease-in-out",
          // 変更点: 透明時は上から黒のグラデーションをかけて視認性確保。スクロール時は強めのブラー。
          isTransparent
            ? "fixed bg-gradient-to-b from-black/60 via-black/30 to-transparent py-6 border-transparent"
            : "sticky bg-background/70 py-2 border-b border-border/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50 shadow-sm"
        )}
      >
        <div className="container mx-auto flex h-12 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Area */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-3 group"
            onClick={closeMenu}
          >
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-heading font-bold text-xl leading-none transition-colors duration-300",
                  isTransparent
                    ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" // Heroの文字と同様のシャドウ感
                    : "text-foreground"
                )}
              >
                ともきちの旅行日記
              </span>
              <span
                className={cn(
                  "text-[10px] font-code tracking-[0.2em] uppercase transition-colors duration-300 mt-0.5",
                  isTransparent
                    ? "text-white/80 drop-shadow-md"
                    : "text-muted-foreground group-hover:text-primary"
                )}
              >
                Travel Diary
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative text-sm font-bold tracking-wide transition-all duration-300 group py-2 font-heading",
                  isTransparent
                    ? "text-white/90 hover:text-white drop-shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {/* Underline Animation */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 ease-out group-hover:w-full rounded-full",
                    isTransparent
                      ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      : "bg-primary"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Icons & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* AI Planner Button */}
            <Link
              href="/ai-planner"
              className={cn(
                "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95",
                isTransparent
                  ? "bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
              )}
            >
              <Sparkles className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-12" />
              <span>AI PLANNER</span>
            </Link>

            {/* Utility Icons */}
            <div
              className={cn(
                "flex items-center gap-1 rounded-full p-1 transition-colors duration-300 ml-2",
                isTransparent
                  ? "bg-black/20 backdrop-blur-md border border-white/10"
                  : "bg-secondary/50 border border-border/50"
              )}
            >
              <button
                onClick={openSearch}
                className={cn(
                  "p-2 rounded-full transition-all hover:scale-110",
                  isTransparent
                    ? "text-white hover:bg-white/20"
                    : "text-foreground hover:bg-background shadow-sm"
                )}
                aria-label="Search"
              >
                <SearchIcon className="h-4 w-4" />
              </button>
              <div className={cn(isTransparent && "text-white")}>
                <ModeToggle />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={openSearch}
              className={cn(
                "p-2 rounded-full transition-all",
                isTransparent
                  ? "text-white hover:bg-white/20"
                  : "text-foreground hover:bg-background shadow-sm"
              )}
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <button
              onClick={toggleMenu}
              className={cn(
                "relative z-50 p-2 rounded-full transition-colors",
                isMenuOpen
                  ? "text-foreground"
                  : isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-foreground hover:bg-accent"
              )}
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            key="mobile-menu"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/80 md:hidden flex flex-col supports-[backdrop-filter]:bg-background/60"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/50 pointer-events-none" />

            <div className="container relative mx-auto mt-28 flex flex-col items-center gap-8 px-6 overflow-y-auto pb-10 h-full justify-center">
              <nav className="flex flex-col items-center gap-6 w-full">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05, type: "spring" }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      className="relative inline-block text-3xl font-heading font-bold text-foreground/80 hover:text-foreground transition-colors py-2"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100px" }}
                transition={{ delay: 0.4 }}
                className="h-px bg-border/50 my-4"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-6"
              >
                <ModeToggle />
                <Link
                  href="/ai-planner"
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
                >
                  <Sparkles className="h-4 w-4" />
                  AIプランナーを使う
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};

export default Header;
