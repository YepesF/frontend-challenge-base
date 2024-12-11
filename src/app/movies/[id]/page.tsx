import { getMovieById, getMovies } from "@/actions/movie";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
    <div className="aspect-video shadow-xl lg:aspect-[3/1]">
      <div className="relative h-full w-full">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="backdrop"
          fill
          className="brightness-[.35]"
        />
        <div className="absolute top-0 grid h-full w-full grid-cols-12 gap-4 px-28 py-5">
          <div className="col-span-3 flex flex-col gap-3 p-2">
            <div className="relative aspect-[4/5]">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="poster"
                fill
              />
            </div>
            <Button className="bg-yellow-500 font-bold text-black transition hover:scale-[1.03] hover:bg-yellow-500/90">
              Watch trailer
            </Button>
          </div>
          <div className="col-span-8 flex flex-col gap-10 p-2">
            <div className="w-fit">
              <h1 className="text-start text-4xl font-bold text-white">
                {movie.title}
              </h1>
              <ul className="flex gap-4 text-white">
                <li>{movie.release_date}</li>
                <li className="text-end">{movie.runtime} Min.</li>
              </ul>
            </div>

            <h2 className="w-fit text-start text-2xl font-bold text-white">
              Overview:
            </h2>

            <p className="text-start text-xl text-white">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
