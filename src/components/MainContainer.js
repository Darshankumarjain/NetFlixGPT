import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useState } from "react";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [mainMovieIndex, setMainMovieIndex] = useState(0);
  if (!movies) return null;

  const mainMovie = movies[mainMovieIndex];
  if (!mainMovie) return null;
  const { title, overview, id } = mainMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={title} overview={overview} id={id} />
      <VideoBackground
        movieId={id}
        onNoVideo={() => setMainMovieIndex((i) => i + 1)}
      />
    </div>
  );
};
export default MainContainer;
