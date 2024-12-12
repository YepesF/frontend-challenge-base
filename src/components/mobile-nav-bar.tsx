"use client";

import { BookmarkIcon, HomeIcon, MagnifyingGlassIcon } from "./icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SearchMovie from "./search-movie";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileNavBar(): JSX.Element {
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className="fixed bottom-0 z-50 flex h-24 w-full items-start justify-center gap-20 bg-secondary/80 py-1 pt-3 backdrop-blur-sm backdrop-filter xl:hidden">
      <Link
        href="/"
        className={cn(
          "flex w-fit cursor-pointer flex-col items-center justify-center text-white transition hover:scale-[1.03] hover:!text-accent",
          currentPath === "/" && "text-accent",
        )}
      >
        <HomeIcon
          type={currentPath === "/" ? "solid" : "outline"}
          className="h-10 w-10"
        />
        <span className="text-center text-sm font-medium">Home</span>
      </Link>
      <SearchMovie>
        <div className="flex w-fit cursor-pointer flex-col items-center justify-center text-white transition hover:scale-[1.03] hover:!text-accent">
          <MagnifyingGlassIcon type="outline" className="h-10 w-10" />
          <span className="text-center text-sm font-medium">Explore</span>
        </div>
      </SearchMovie>
      <Link
        href="/favorites"
        className={cn(
          "flex w-fit cursor-pointer flex-col items-center justify-center text-white transition hover:scale-[1.03] hover:!text-accent",
          currentPath === "/favorites" && "text-accent",
        )}
      >
        <BookmarkIcon
          type={currentPath === "/favorites" ? "solid" : "outline"}
          className="h-10 w-10"
        />
        <span className="text-center text-sm font-medium">Favorites</span>
      </Link>
    </div>
  );
}
