import Movie from "./Movie.js";

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list scrollable-div list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
