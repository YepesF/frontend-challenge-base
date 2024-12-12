import { useState, useEffect } from "react";

const FAVORITES_KEY = "favoriteMovies";
const SEARCHES_KEY = "recentSearches";

export function useLocalStorage(): {
  favoriteMovies: string[];
  recentSearches: string[];
  addFavoriteMovie: (id: string) => void;
  removeFavoriteMovie: (id: string) => void;
  addRecentSearch: (query: string) => void;
} {
  const [favoriteMovies, setFavoriteMovies] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    const storedSearches = localStorage.getItem(SEARCHES_KEY);

    const isStringArray = (value: unknown): value is string[] => {
      return (
        Array.isArray(value) && value.every((item) => typeof item === "string")
      );
    };

    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      if (isStringArray(parsedFavorites)) {
        setFavoriteMovies(parsedFavorites);
      }
    }

    if (storedSearches) {
      const parsedSearches = JSON.parse(storedSearches);
      if (isStringArray(parsedSearches)) {
        setRecentSearches(parsedSearches);
      }
    }
  }, []);

  const addFavoriteMovie = (id: string): void => {
    setFavoriteMovies((prev) => {
      const updated = [...prev, id];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavoriteMovie = (id: string): void => {
    setFavoriteMovies((prev) => {
      const updated = prev.filter((movieId) => movieId !== id);
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
