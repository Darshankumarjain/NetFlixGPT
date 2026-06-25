import { IMG_CDN_URL } from "../utils/constants";
import { useState } from "react";
import MovieDescription from "./MovieDescription";

const MovieCard = ({ posterPath, movieId }) => {
  const [showDescription, setShowDescription] = useState(false);
  if (!posterPath) return null;
  return (
    <div
      className="w-36 md:w-48 pr-4 cursor-pointer"
      onClick={() => setShowDescription(true)}
    >
      <img alt="Movie Card " src={IMG_CDN_URL + posterPath} />
      {showDescription && (
        <MovieDescription
          movieId={movieId}
          onClose={() => setShowDescription(false)}
        />
      )}
    </div>
  );
};
export default MovieCard;
