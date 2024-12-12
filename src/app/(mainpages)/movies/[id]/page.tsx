import { getMovieById, getMovies } from "@/actions/movie";
import FavoriteButton from "@/components/favorite-button";
import { ChevronLeftIcon } from "@/components/icons";
import TrailerDialog from "@/components/trailer-dialog";
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

  if (!movie) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <span className="text-center text-4xl text-accent">Movie no found</span>
        <Link href={`/`} className="w-fit">
          <Button className="w-40 rounded-full bg-accent font-bold text-white transition hover:scale-[1.03] hover:bg-accent/95">
            Back
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full w-full px-0 pb-32 xl:px-16 xl:pb-10">
      <div className="relative flex h-[45vh] items-center justify-center overflow-hidden shadow-xl xl:aspect-video xl:h-full xl:rounded-xl">
        <Link
          href="/"
          className="absolute left-5 top-5 z-50 w-min cursor-pointer rounded-full bg-secondary p-2 text-white transition hover:scale-[1.03] hover:bg-accent"
        >
          <ChevronLeftIcon type="outline" />
        </Link>
        <FavoriteButton
          variant="outline"
          movie={{
            id: movie.id.toString(),
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
          }}
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
        <div className="absolute bottom-5 left-5 flex w-fit flex-col items-start justify-start">
          <div className="flex items-center justify-start gap-2">
            <div className="relative h-10 w-10 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14">
              <Image src="/imdb.png" alt="imdb" fill />
            </div>
            <span className="w-min font-semibold text-white 2xl:text-2xl">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <h1 className="w-fit text-2xl font-bold text-white xl:text-3xl 2xl:text-5xl">
            {movie.title}
          </h1>
          <div className="flex w-full flex-col items-start justify-between gap-4">
            <div className="flex gap-2 py-2">
              {movie.genres.slice(0, 4).map(({ id, name }) => (
                <Badge
                  key={`genre-${id}`}
                  className="w-fit rounded-full border-accent bg-accent/15 text-accent"
                  variant="outline"
                >
                  {name}
                </Badge>
              ))}
            </div>
            {movie.trailer && (
              <TrailerDialog url={movie.trailer}>
                <Button className="w-40 rounded-full bg-accent font-bold text-white transition hover:scale-[1.03] hover:bg-accent/95 2xl:w-48">
                  Trailer
                </Button>
              </TrailerDialog>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-4 py-4 xl:gap-5">
        <ul className="flex w-fit items-center justify-start gap-2 text-white">
          <li className="w-fit text-sm xl:text-base 2xl:text-lg">
            {movie.release_date || "-"}
          </li>
          <li className="w-fit text-sm xl:text-base 2xl:text-lg">·</li>
          <li className="w-fit text-sm xl:text-base 2xl:text-lg">
            {movie.runtime || "-"}
          </li>
        </ul>
        <p className="text-sm text-white/60 xl:text-base 2xl:text-lg">
          {movie.overview}
        </p>
        <ul className="grid w-full grid-cols-2 gap-4 xl:w-1/2">
          <li>
            <h2 className="text-sm text-white xl:text-base 2xl:text-lg">
              Audio Track
            </h2>
            <span className="text-sm text-white/60 xl:text-base 2xl:text-lg">
              {movie.spoken_languages || "-"}
            </span>
          </li>
          <li>
            <h2 className="text-sm text-white xl:text-base 2xl:text-lg">
              Subtitles
            </h2>
            <span className="text-sm text-white/60 xl:text-base 2xl:text-lg">
              {movie.spoken_languages || "-"}
            </span>
          </li>
          <li>
            <h2 className="text-sm text-white xl:text-base 2xl:text-lg">
              County
            </h2>
            <span className="text-sm text-white/60 xl:text-base 2xl:text-lg">
              {movie.production_countries || "-"}
            </span>
          </li>
        </ul>
        {movie.cast.length && (
          <div className="w-full">
            <h2 className="mb-3 text-sm text-white xl:text-base 2xl:text-lg">
              Cast
            </h2>
            <div className="scrollbar-hidden flex space-x-4 overflow-x-auto whitespace-nowrap">
              {movie.cast.map((actor) => (
                <div key={`actor-${actor.id}`} className="w-44">
                  <div className="relative h-60 w-44">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                      alt={actor.name}
                      fill
                      className="rounded-sm"
                    />
                  </div>
                  <h2 className="mt-2 w-fit text-sm text-white xl:text-base 2xl:text-lg">
                    {actor.name}
                  </h2>
                  <p className="truncate text-xs text-white/60 xl:text-sm 2xl:text-base">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
