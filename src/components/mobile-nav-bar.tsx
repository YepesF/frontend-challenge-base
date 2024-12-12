"use client";

import { usePathname } from "next/navigation";
import { BookmarkIcon, HomeIcon, MagnifyingGlassIcon } from "./icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SearchMovie from "./search-movie";

export default function MobileNavBar(): JSX.Element {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 z-50 flex h-24 w-full items-start justify-center gap-20 bg-secondary/80 py-1 pt-3 backdrop-blur-sm backdrop-filter">
      <Link
        href="/"
        className={cn(
          "flex w-fit cursor-pointer flex-col items-center justify-center text-white transition hover:scale-[1.03] hover:!text-accent",
          pathname === "/" && "text-accent",
        )}
      >
        <HomeIcon
          type={pathname === "/" ? "solid" : "outline"}
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
          pathname === "/favorites" && "text-accent",
        )}
      >
        <BookmarkIcon type="outline" className="h-10 w-10" />
        <span className="text-center text-sm font-medium">Favorites</span>
      </Link>
    </div>
  );
}
