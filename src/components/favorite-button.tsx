"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { BookmarkIcon } from "./icons";

interface IFavoriteButton {
  variant: "outline" | "solid";
  className?: string;
}

export default function FavoriteButton({
  variant,
  className,
}: IFavoriteButton): JSX.Element {
  const [favorite, setFavorite] = useState<boolean>(false);

  if (variant === "outline") {
    return (
      <div
        className={cn(
          "w-min cursor-pointer rounded-full bg-transparent p-2 text-white transition hover:scale-[1.03]",
          favorite && "p-2 text-accent",
          className,
        )}
        onClick={() => setFavorite(!favorite)}
      >
        <BookmarkIcon type={favorite ? "solid" : "outline"} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-min cursor-pointer rounded-full bg-secondary p-2 text-white transition hover:scale-[1.03]",
        favorite && "bg-accent/30 p-2 text-accent",
        className,
      )}
      onClick={() => setFavorite(!favorite)}
    >
      <BookmarkIcon type={favorite ? "solid" : "outline"} />
    </div>
  );
}
