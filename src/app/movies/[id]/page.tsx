import { IResponseTMDB } from "@/interfaces/TMDB";

export const revalidate = 86400;

const getMovies = async (page: string = "1"): Promise<IResponseTMDB> => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const json: IResponseTMDB = await res.json();
    return json;
  } catch (error) {
    return {
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 0,
    } as IResponseTMDB;
  }
};

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
