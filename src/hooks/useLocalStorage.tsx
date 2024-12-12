import { IFavoriteMovie } from "@/interfaces/TMDB";
import { useState, useEffect } from "react";

const FAVORITES_KEY = "favoriteMovies";
const SEARCHES_KEY = "recentSearches";

export function useLocalStorage(): {
  favoriteMovies: IFavoriteMovie[];
  recentSearches: string[];
  addFavoriteMovie: (movie: IFavoriteMovie) => void;
  removeFavoriteMovie: (id: string) => void;
  addRecentSearch: (query: string) => void;
} {
  const [favoriteMovies, setFavoriteMovies] = useState<IFavoriteMovie[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    const storedSearches = localStorage.getItem(SEARCHES_KEY);

    const isFavoriteMovieArray = (
      value: unknown,
    ): value is IFavoriteMovie[] => {
      return (
        Array.isArray(value) &&
        value.every(
          (item) =>
            typeof item === "object" &&
            typeof item.id === "string" &&
            typeof item.poster_path === "string" &&
            typeof item.vote_average === "number",
        )
      );
    };

    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      if (isFavoriteMovieArray(parsedFavorites)) {
        setFavoriteMovies(parsedFavorites);
      }
    }

    if (storedSearches) {
      const parsedSearches = JSON.parse(storedSearches);
      if (
        Array.isArray(parsedSearches) &&
        parsedSearches.every((item) => typeof item === "string")
      ) {
        setRecentSearches(parsedSearches);
      }
    }
  }, []);

  const addFavoriteMovie = (movie: IFavoriteMovie): void => {
    setFavoriteMovies((prev) => {
      const updated = [...prev, movie];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavoriteMovie = (id: string): void => {
    setFavoriteMovies((prev) => {
      const updated = prev.filter((movie) => movie.id !== id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const addRecentSearch = (query: string): void => {
    setRecentSearches((prev) => {
      const updated = [query, ...prev].slice(0, 10);
      localStorage.setItem(SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    favoriteMovies,
    recentSearches,
    addFavoriteMovie,
    removeFavoriteMovie,
    addRecentSearch,
  };
}
