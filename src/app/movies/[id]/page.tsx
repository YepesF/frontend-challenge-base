import { getMovies } from "@/actions/movie";

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

export default function MoviePage({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const movieId = parseInt(params.id);
  return <div>{movieId}</div>;
}
