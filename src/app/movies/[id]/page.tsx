import { getMovieById, getMovies } from "@/actions/movie";
import FavoriteButton from "@/components/favorite-button";
import { ChevronLeftIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const maxPages = 500;
  let currentPage = 1;
  const allMovies: { id: string }[] = [];
  while (currentPage <= maxPages) {
    const movies = await getMovies(currentPage.toString());
    movies.results.forEach(({ id }) => {
      allMovies.push({ id: id.toString() });
    });
    currentPage++;
  }
  return allMovies;
}

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const movieId = parseInt(params.id);
  const movie = await getMovieById(movieId);
  return (
    <div>
      <div className="relative flex h-[50vh] items-center justify-center shadow-xl">
        <Link
          href="/"
          className="absolute left-5 top-5 z-50 w-min cursor-pointer rounded-full bg-secondary p-2 text-white transition hover:scale-[1.03]"
        >
          <ChevronLeftIcon type="outline" />
        </Link>
        <FavoriteButton
          variant="outline"
          movieId={params.id}
          className="absolute right-6 top-6 z-50"
        />
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
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
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <h1 className="w-fit text-2xl font-bold text-white">{movie.title}</h1>
          <div className="flex w-96 flex-col items-start justify-between gap-4">
            <div className="flex gap-2 py-2">
              {movie.genres.slice(0, 4).map(({ name }) => (
                <Badge
                  className="w-fit rounded-full border-accent bg-accent/15 text-accent"
                  variant="outline"
                >
                  {name}
                </Badge>
              ))}
            </div>
            <Link href={`/movies/${movie.id}`} className="w-fit">
              <Button className="w-40 rounded-full bg-accent font-bold text-white transition hover:scale-[1.03] hover:bg-accent/95">
                Trailer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
