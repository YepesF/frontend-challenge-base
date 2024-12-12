"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { MagnifyingGlassIcon } from "./icons";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ISearchMovieProps {
  children: React.ReactNode;
}

export default function SearchMovie({
  children,
}: ISearchMovieProps): JSX.Element {
  const { addRecentSearch, recentSearches } = useLocalStorage();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addRecentSearch(query);
    router.push(`/?query=${encodeURIComponent(query)}`);
    setQuery("");
  };

  const handleClick = (textQuery: string): void => {
    router.push(`/?query=${encodeURIComponent(textQuery)}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-11/12 rounded-lg border p-0 shadow-md md:min-w-[450px]">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <form className="mb-0" onSubmit={handleSubmit}>
          <div className="relative flex items-center">
            <MagnifyingGlassIcon
              type="outline"
              className="absolute left-2 size-5"
            />
            <Input
              type="text"
              placeholder="Type your movie and press Enter"
              className="pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <DialogClose asChild>
            <Button
              className="hidden"
              type="submit"
              variant="ghost"
              size="icon"
            >
              Close
            </Button>
          </DialogClose>
        </form>
        <span className="px-5 text-xs text-gray-500">Recent searches</span>
        <div className="flex max-h-40 flex-col gap-3 overflow-auto px-3 pb-3">
          {recentSearches.length
            ? recentSearches.map((search, index) => (
                <DialogClose
                  key={`search-${search + index}`}
                  className="cursor-pointer rounded-md p-2 hover:bg-accent/30 hover:text-accent"
                  asChild
                >
                  <span onClick={() => handleClick(search)}>{search}</span>
                </DialogClose>
              ))
            : ["Batman", "Superman", "Spiderman"].map((search, index) => (
                <DialogClose
                  key={`search-${search + index}`}
                  className="cursor-pointer rounded-md p-2 hover:bg-accent/30 hover:text-accent"
                  asChild
                >
                  <span onClick={() => handleClick(search)}>{search}</span>
                </DialogClose>
              ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
