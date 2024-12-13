"use client";

import { MagnifyingGlassIcon } from "./icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SearchMovie from "./search-movie";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Input } from "./ui/input";

export default function DesktopNavBar(): JSX.Element {
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className="sticky top-0 !z-50 hidden w-full items-center justify-between gap-20 px-16 py-3 backdrop-blur-lg backdrop-filter xl:flex">
      <div className="flex gap-12">
        <Link href="/" className="relative h-6 w-32">
          <Image src="/Logo.png" alt="logo" fill />
        </Link>

        <div className="flex w-fit items-center justify-center gap-3">
          <Link
            href="/"
            className={cn(
              "flex w-fit cursor-pointer flex-col items-center justify-center text-white transition hover:scale-[1.03] hover:!text-accent",
              currentPath === "/" && "text-accent",
            )}
          >
            <span className="text-center text-sm font-semibold">Popular</span>
          </Link>
          <Link
            href="/favorites"
            className={cn(
              "flex w-fit cursor-pointer flex-col items-center justify-center text-white transition hover:scale-[1.03] hover:!text-accent",
              currentPath === "/favorites" && "text-accent",
            )}
          >
            <span className="text-center text-sm font-semibold">Favorites</span>
          </Link>
        </div>
      </div>

      <SearchMovie>
        <div className="relative flex w-80 items-center">
          <MagnifyingGlassIcon
            type="outline"
            className="absolute left-2 size-4 text-accent"
          />
          <Input
            type="text"
            placeholder="Search movie"
            className="h-8 cursor-pointer border-accent pl-8 text-xs"
          />
        </div>
      </SearchMovie>
    </div>
  );
}
