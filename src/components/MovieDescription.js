import { useEffect, useState } from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";

const MovieDescription = ({ movieId, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      API_OPTIONS,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("movie details:", data); // ← add this
        setDetails(data);
      });
  }, [movieId]);

  if (!details) return null;

  const runtime = `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`;
  const genres = details.genres?.map((g) => g.name).join(" and ") || "N/A";
  const releaseDate = new Date(details.release_date).toLocaleDateString(
    "en-US",
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-gray-900 text-white p-10 rounded-lg w-3/4 md:w-1/2 relative">
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // ← stops click reaching parent div
            onClose();
          }}
          className="absolute top-4 right-4 text-2xl"
        >
          ✕
        </button>

        <div className="flex gap-6">
          {/* Poster */}
          <img
            src={IMG_CDN_URL + details.poster_path}
            alt={details.title}
            className="w-40 rounded-lg"
          />

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold">
              {details.title}{" "}
              <span className="font-normal text-gray-400">
                ({new Date(details.release_date).getFullYear()})
              </span>
            </h1>

            <p className="text-gray-400 mt-1">
              {releaseDate} • {genres} • {runtime}
            </p>

            <p className="mt-6 text-gray-300 font-bold">Overview</p>
            <p className="mt-1 text-gray-400">{details.overview}</p>

            <p className="mt-4 text-yellow-400 text-xl font-bold">
              ⭐ {details.vote_average?.toFixed(1)} / 10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
