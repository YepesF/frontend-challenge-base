import Image from "next/image";
import { getMovies, getMoviesByQuery } from "@/actions/movie";
import { Card, CardHeader } from "@/components/ui/card";
import FavoriteButton from "@/components/favorite-button";
import MoviePagination from "@/components/movie-pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}): Promise<JSX.Element> {
  const page = searchParams.page || "1";
  const query = searchParams.query || "";
  const movieBanner = (await getMovies()).results[0];
  const movies = query
    ? await getMoviesByQuery(query, page)
    : await getMovies(page);

  return (
    <div className="w-full">
      <div className="fixed left-5 top-10 z-50 w-min">
        <div className="relative h-10 w-40">
          <Image src="/Logo.png" alt="logo" fill />
        </div>
      </div>
      <div className="relative flex h-[50vh] items-center justify-center shadow-xl">
        <Image
          src={`https://image.tmdb.org/t/p/original${movieBanner.poster_path}`}
          alt="banner"
          fill
          style={{
            filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 5))",
            maskImage: "linear-gradient(black 30%, transparent)",
          }}
        />

        <div className="absolute bottom-10 left-5 z-50 flex w-fit flex-col items-start justify-start">
          <div className="flex items-center justify-start gap-2">
            <div className="relative h-10 w-10">
              <Image src="/imdb.png" alt="imdb" fill />
            </div>
            <span className="w-min font-semibold text-white">
              {movieBanner.vote_average.toFixed(1)}
            </span>
          </div>
          <h1 className="w-fit text-2xl font-bold text-white">
            {movieBanner.title}
          </h1>
          <div className="flex w-72 items-center justify-between pt-6">
            <Link href={`/movies/${movieBanner.id}`} className="w-fit">
              <Button className="w-40 rounded-full bg-accent font-bold text-white transition hover:scale-[1.03] hover:bg-accent/95">
                Watch now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {!movies.results.length && (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
          <span className="text-center text-4xl text-accent">
            Movie no found
          </span>
          <Link href={`/`} className="w-fit">
            <Button className="w-40 rounded-full bg-accent font-bold text-white transition hover:scale-[1.03] hover:bg-accent/95">
              Back
            </Button>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 px-4 py-8 lg:grid-cols-4 xl:grid-cols-5">
        {movies.results.map((movie) => (
          <Link key={`movie-${movie.id}`} href={`/movies/${movie.id}`}>
            <Card className="cursor-pointer overflow-hidden bg-gray-700 transition hover:scale-[1.03]">
              <CardHeader className="relative aspect-[2/3]">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                      : "/default-movie.webp"
                  }
                  alt={movie.title}
                  fill
                />
                <div className="absolute -left-0 top-2 flex w-full items-center justify-between px-4">
                  <div className="flex w-fit items-center justify-start gap-2 rounded-full bg-secondary/30 px-2">
                    <div className="relative h-6 w-6">
                      <Image src="/imdb.png" alt="imdb" fill />
                    </div>
                    <span className="w-min font-semibold text-white">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <FavoriteButton
                    variant="outline"
                    movieId={movie.id.toString()}
                  />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      {movies.results.length && (
        <MoviePagination
          currentPage={movies.page}
          totalPages={movies.total_pages}
        />
      )}
    </div>
  );
}
