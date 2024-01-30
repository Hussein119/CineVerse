import { useEffect, useState } from "react";
import NavBar from "./components/NavBar.js";
import Search from "./components/Search.js";
import NumResults from "./components/NumResults.js";
import Main from "./components/Main.js";
import Box from "./components/Box.js";
import Loader from "./components/Loader.js";
import MovieList from "./components/MovieList.js";
import ErrorMessage from "./components/ErrorMessage.js";
import MovieDetails from "./components/MovieDetails.js";
import WatchedSummary from "./components/WatchedSummary.js";
import WatchedMoviesList from "./components/WatchedMoviesList.js";

const apiKey = "de1a81f7";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // useEffect(() => {
  //   console.log("After the initial render");
  // }, []);

  // useEffect(() => {
  //   console.log("After every render");
  // });

  // useEffect(() => {
  //   console.log("D");
  // }, [query]);

  // console.log("During render");

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

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

        if (data.Response === "False") throw new Error("Movie not found");

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

    handleCloseMovie();
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

    fetchDefaultMovies();
  }, [isQuery]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        {movies ? <NumResults length={movies?.length} /> : ""}
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
