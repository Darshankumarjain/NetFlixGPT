import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="mt-0 md:-mt-72 relative z-30 pl-4 md:pl-14">
          <MovieList title={"Now Playing Movies"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
          <MovieList
            title={"Top Rated Movies"}
            movies={movies.topRatedMovies}
          />
          <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
          {/* <MovieList title={"Horror"} movies={movies.nowPlayingMovies} /> */}
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;
