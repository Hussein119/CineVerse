const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{Number(watched.length)} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{Number(avgImdbRating).toPrecision(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Number(avgUserRating).toPrecision(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Number(avgRuntime).toPrecision(3)} min</span>
        </p>
      </div>
    </div>
  );
}
