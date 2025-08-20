"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoIcon, SearchIcon, MenuIcon, XIcon } from "@/components/Icons";
import ModeToggle from "../mode-toggle";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    // { href: "destination", label: "Destination" },
    { href: "/series", label: "Series" },
    { href: "/posts", label: "Blog" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon />
            <span className="font-bold text-lg text-foreground font-heading">
              ともきちの旅行日記
            </span>
            <span className="text-muted-foreground font-heading">
              Traveldiary
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative pb-[5px] font-medium text-muted-foreground transition-colors hover:text-secondary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            {/* <button className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground">
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </button> */}
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
            key="mobile-menu"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="container mx-auto mt-20 flex h-full flex-col items-center gap-8 px-4 sm:px-6 lg:px-8">
              {/* Mobile Search Bar */}
              {/* <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full rounded-full border border-input bg-transparent py-2 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div> */}

              {/* Mobile Navigation */}
              <nav className="flex flex-col items-center gap-6 text-lg font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative pb-[5px] font-medium text-muted-foreground transition-colors hover:text-secondary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
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
    </>
  );
};

export default Header;
