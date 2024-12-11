"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { BookmarkIcon } from "./icons";

export default function FavoriteButton(): JSX.Element {
  const [favorite, setFavorite] = useState<boolean>(false);
  return (
    <div
      className={cn(
        "w-min cursor-pointer rounded-full bg-secondary p-2 text-white transition hover:scale-[1.03]",
        favorite && "bg-accent/30 p-2 text-accent",
      )}
      onClick={() => setFavorite(!favorite)}
    >
      <BookmarkIcon type={favorite ? "solid" : "outline"} />
    </div>
  );
}
