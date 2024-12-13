"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage(): JSX.Element {
  const { favoriteMovies } = useLocalStorage();

  return (
    <div className="mb-32 min-h-[95vh] w-full px-5 xl:mb-10">
      {!favoriteMovies.length && (
        <div className="flex min-h-[95vh] flex-col items-center justify-center gap-4">
          <span className="text-center text-4xl text-accent 2xl:text-5xl">
            You haven't added any movies to your favorites yet. Start adding
            some!
          </span>
          <Link href={`/`} className="w-fit">
            <Button className="w-40 rounded-full bg-accent font-bold text-white transition hover:scale-[1.03] hover:bg-accent/95 2xl:w-48">
              Back
            </Button>
          </Link>
        </div>
      )}
      <div className="xl:gap-52xl:grid-cols-5 grid grid-cols-2 gap-3 px-4 py-8 md:grid-cols-4 xl:gap-5 2xl:grid-cols-5 2xl:gap-6">
        {favoriteMovies.map((movie) => {
          if (!movie.id) {
            return null;
          }
          return (
            <Link key={`movie-${movie.id}`} href={`/movies/${movie.id}`}>
              <Card className="cursor-pointer overflow-hidden border-transparent bg-gray-700 transition hover:scale-[1.03]">
                <CardHeader className="relative aspect-[2/3] border-transparent">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : "/default-movie.webp"
                    }
                    alt={movie.title || ""}
                    fill
                    quality={30}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/default-movie.webp"
                  />
                  <div className="absolute -left-0 top-2 flex w-full items-center justify-between px-4">
                    <div className="flex w-fit items-center justify-start gap-2 rounded-full bg-secondary/30 px-2">
                      <div className="relative h-6 w-6 2xl:h-10 2xl:w-10">
                        <Image src="/imdb.png" alt="imdb" fill />
                      </div>
                      <span className="w-min font-semibold text-white 2xl:text-xl">
                        {movie.vote_average?.toFixed(1) || "-"}
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
