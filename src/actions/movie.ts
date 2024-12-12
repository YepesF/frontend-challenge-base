"use server";

import {
  IMovieDetailResponse,
  IMovieDetailTMDB,
  IResponseTMDB,
} from "@/interfaces/TMDB";
import { parseDate, parseDuration } from "@/lib/parse";

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

    const moviesData: IResponseTMDB = await res.json();
    return moviesData;
  } catch (error) {
    return {
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 0,
    } as IResponseTMDB;
  }
};

export const getMoviesByQuery = async (
  query: string,
  page: string = "1",
): Promise<IResponseTMDB> => {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
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

    const moviesData: IResponseTMDB = await res.json();
    return moviesData;
  } catch (error) {
    return {
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 0,
    } as IResponseTMDB;
  }
};

export const getMovieById = async (
  id: number,
): Promise<IMovieDetailResponse> => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos`;
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

    const movieData: IMovieDetailTMDB = await res.json();
    const youtubeId =
      movieData.videos.results.find(
        ({ type }) => type === "Trailer" || type === "Teaser",
      )?.key || "";

    const cast = movieData.credits.cast
      .filter((actor) => actor.profile_path)
      .map((actor) => ({
        id: actor.id,
        name: actor.name,
        profile_path: actor.profile_path,
        character: actor.character,
      }));

    return {
      id: movieData.id,
      poster_path: movieData.poster_path,
      vote_average: movieData.vote_average,
      title: movieData.title,
      genres: movieData.genres,
      trailer: youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : "",
      release_date: parseDate(movieData.release_date),
      runtime: parseDuration(movieData.runtime),
      overview: movieData.overview,
      spoken_languages: movieData.spoken_languages
        .map((language) => language.english_name)
        .join(", "),
      production_countries: movieData.production_countries[0].name,
      cast,
    } as IMovieDetailResponse;
  } catch (error) {
    return {} as IMovieDetailResponse;
  }
};
