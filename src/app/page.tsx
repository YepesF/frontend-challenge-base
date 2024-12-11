import NavBar from "@/components/nav-bar";
import RootLayout from "./layout";
import Image from "next/image";
import { getMovies, getMoviesByQuery } from "@/actions/movie";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import FavoriteButton from "@/components/favorite-button";
import MoviePagination from "@/components/movie-pagination";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}): Promise<JSX.Element> {
  const page = searchParams.page || "1";
  const query = searchParams.query || "";
  const movies = query
    ? await getMoviesByQuery(query, page)
    : await getMovies(page);

  return (
    <RootLayout>
      <NavBar />
      <div className="relative flex aspect-video items-center justify-center shadow-xl lg:aspect-[4/1]">
        <Image
          src="/bannerr.jpeg"
          alt="banner"
          fill
          style={{
            filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 5))",
            maskImage: "linear-gradient(black 30%, transparent)",
          }}
        />
        <div className="absolute bottom-0 p-2">
          <h2 className="text-xl font-bold lg:text-4xl">Kung Fu Panda 4</h2>
          <p className="text-sm font-bold lg:w-1/3 lg:text-xl">
            Join Po and the Furious Five on a new epic adventure! Discover the
            power of friendship and the strength within! Get ready to unleash
            your inner warrior! 🥋✨
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 py-8 lg:grid-cols-4 xl:grid-cols-5">
        {movies.results.map((movie) => (
          <Link key={`movie-${movie.id}`} href={`/movies/${movie.id}`}>
            <Card className="cursor-pointer overflow-hidden bg-gray-700 transition hover:scale-[1.03]">
              <CardHeader className="relative aspect-square">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                      : "/default-movie.webp"
                  }
                  alt={movie.title}
                  fill
                />
                <FavoriteButton />
              </CardHeader>
              <CardContent className="p-2">
                <h1 className="truncate text-start text-base font-semibold text-white">
                  {movie.title}
                </h1>
                <span className="text-xs text-white/30">
                  {movie.release_date || "0000-00-00"}{" "}
                </span>
                <div className="mt-3 h-20 max-w-sm">
                  <h2 className="text-start text-sm text-white/30">SUMMARY</h2>
                  <p className="line-clamp-4 text-xs text-white/30">
                    {movie.overview}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <MoviePagination
        currentPage={movies.page}
        totalPages={movies.total_pages}
      />
    </RootLayout>
  );
}
