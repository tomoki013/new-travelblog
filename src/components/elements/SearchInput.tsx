"use client";

import { useState, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";

interface SearchInputProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  onReset: () => void;
}

export const SearchInput = ({
  initialValue = "",
  onSearch,
  onReset,
}: SearchInputProps) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleReset = () => {
    setQuery("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-grow">
        <Input
          type="search"
          placeholder="キーワードで検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-white/80 text-gray-800"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <Button type="submit" variant="default">
        検索
      </Button>
      <Button type="button" variant="outline" onClick={handleReset}>
        リセット
      </Button>
    </form>
  );
};
