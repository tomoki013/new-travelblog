"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { KeyboardEventHandler, useState } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = () => {
    if (searchTerm.trim() === "" && !selectedCategory) {
      onClose();
      return;
    }

    let queryString = "/posts?";
    if (searchTerm.trim()) {
      queryString += `search=${encodeURIComponent(searchTerm.trim())}`;
    }
    if (selectedCategory) {
      if (searchTerm.trim()) queryString += "&";
      queryString += `category=${selectedCategory}`;
    }

    router.push(queryString);
    onClose();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-background w-full max-w-2xl mx-auto mt-20 p-6 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-accent"
            >
              <XIcon className="h-6 w-6" />
            </button>

            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold font-heading">サイト内検索</h2>

              {/* Keyword Search */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="キーワードを入力..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow"
                />
                <Button onClick={handleSearch}>
                  <SearchIcon className="h-5 w-5 mr-2" />
                  検索
                </Button>
              </div>

              {/* Category Search */}
              <div>
                <h3 className="text-lg font-semibold mb-2 font-heading">
                  カテゴリを絞り込む
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="categories">
                    <AccordionTrigger>カテゴリーを選択</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                        {categories
                          .filter((c) => c.slug !== "all")
                          .map((category) => (
                            <Button
                              key={category.slug}
                              variant={
                                selectedCategory === category.slug
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                handleCategorySelect(category.slug)
                              }
                            >
                              {category.title}
                            </Button>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
