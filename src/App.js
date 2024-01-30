import { useState } from "react";
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
import { useMovies } from "./components/useMovies.js";
import { useLocalStorageState } from "./components/useLocalStorageState.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, true);
  const [watched, setWatched] = useLocalStorageState([], "watched");

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

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        {<NumResults length={movies.length} />}
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
