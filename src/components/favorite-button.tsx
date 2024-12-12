"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BookmarkIcon } from "./icons";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IFavoriteMovie } from "@/interfaces/TMDB";

interface IFavoriteButton {
  variant: "outline" | "solid";
  movie: IFavoriteMovie;
  className?: string;
}

export default function FavoriteButton({
  variant,
  movie,
  className,
}: IFavoriteButton): JSX.Element {
  const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } =
    useLocalStorage();
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleClick = (): void => {
    favorite ? removeFavoriteMovie(movie.id) : addFavoriteMovie(movie);
    setFavorite(!favorite);
  };

  useEffect(() => {
    setFavorite(favoriteMovies.some(({ id }) => id === movie.id));
  }, [favoriteMovies, movie]);

  if (variant === "outline") {
    return (
      <div
        className={cn(
          "w-min cursor-pointer rounded-full bg-transparent p-2 text-white transition hover:scale-[1.03]",
          favorite && "p-2 text-accent",
          className,
        )}
        onClick={handleClick}
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
      onClick={handleClick}
    >
      <BookmarkIcon type={favorite ? "solid" : "outline"} />
    </div>
  );
}
