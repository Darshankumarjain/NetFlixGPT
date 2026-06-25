import { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    rowRef.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>

      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 h-full z-10 px-4 
                     bg-gradient-to-r from-black/80 to-transparent
                     text-white text-4xl
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-300"
        >
          ❮
        </button>

        {/* Movie Row */}
        <div ref={rowRef} className="flex overflow-x-scroll scrollbar-hide">
          <div className="flex">
            {movies?.map((movie) => (
              <MovieCard
                key={movie.id}
                posterPath={movie.poster_path}
                movieId={movie.id}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 h-full z-10 px-4
                     bg-gradient-to-l from-black/80 to-transparent
                     text-white text-4xl
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-300"
        >
          ❯
        </button>
      </div>
    </div>
  );
};
export default MovieList;
