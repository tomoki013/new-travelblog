"use client";

import { MenuIcon, XIcon } from "@/components/Icons";
import { NAV_LINKS } from "@/constants/navigation";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"; // 変更点: useRef をインポート
import ModeToggle from "../elements/mode-toggle";
import SearchOverlay from "../featured/search/SearchOverlay";

const Header = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // 変更点: メニュー要素への参照を作成

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isSearchOpen]);

  // 変更点: メニュー外のクリックを検知するuseEffectを追加
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // メニューが開いていて、menuRefがcurrentを保持しており、
      // かつクリックされた要素がメニュー要素の外側である場合
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    // イベントリスナーを追加
    document.addEventListener("mousedown", handleClickOutside);

    // クリーンアップ関数
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]); // isMenuOpenとcloseMenuを依存配列に追加

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 max-h-16"
            onClick={closeMenu}
          >
            <span className="font-bold text-lg text-foreground font-heading">
              ともきちの旅行日記
            </span>
            <span className="text-xl text-muted-foreground font-code">
              Traveldiary
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative flex items-center pb-[5px] font-medium text-muted-foreground transition-colors hover:text-secondary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
                {link.isNew && (
                  <span className="ml-2 rounded-md bg-primary px-1.5 py-0.5 text-xs font-semibold leading-none text-primary-foreground">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={openSearch}
              className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground"
            >
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </button>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={openSearch}
              className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground"
            >
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-foreground"
              aria-label="Open menu"
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

      {/* Mobile Menu Overlay (Framer Motion) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef} // 変更点: 作成したrefをメニューのdivに設定
            key="mobile-menu"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="container mx-auto mt-20 flex h-full flex-col items-center gap-8 px-4 sm:px-6 lg:px-8">
              {/* Mobile Navigation */}
              <nav className="flex flex-col items-center gap-6 text-lg font-medium">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative flex items-center pb-[5px] font-medium text-muted-foreground transition-colors hover:text-secondary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
                    onClick={closeMenu}
                  >
                    {link.label}
                    {link.isNew && (
                      <span className="ml-2 rounded-md bg-primary px-1.5 py-0.5 text-xs font-semibold leading-none text-primary-foreground">
                        NEW
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              <div className="mb-8 flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Switch Theme:
                </span>
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};

export default Header;
