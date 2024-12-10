"use server";

import { IResponseTMDB } from "@/interfaces/TMDB";

export const getMovies = async (page: string = "1"): Promise<IResponseTMDB> => {
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
    // Manejo del caso de error devolviendo un objeto vacío o con valores por defecto.
    return {
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 0,
    } as IResponseTMDB;
  }
};
