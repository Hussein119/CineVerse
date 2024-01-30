import { useEffect, useState } from "react";

const apiKey = "de1a81f7";

export function useMovies(query, isDefault = true) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isQuery = query.length === 0;

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Some thing went wrong with fetching movies");

        const data = await res.json();

        if (data.Response === "False") {
          setMovies([]);
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length === 0) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    async function fetchDefaultMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=random`
        );

        if (!res.ok)
          throw new Error("Some thing went wrong with fetching movies");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (isDefault) fetchDefaultMovies();
  }, [isQuery, isDefault]);

  return { movies, isLoading, error };
}
