import WatchedMovie from "./WatchedMovie.js";

export default function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list scrollable-div">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
