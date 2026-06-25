import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTreserVideo } from "../utils/movieSlice";

const useMovieTreser = (movieId) => {
  const dispatch = useDispatch();

  const treserMovies = useSelector((Store) => Store.movies.treserVideo);

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS,
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Teaser");
    const treser = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTreserVideo(treser));
  };

  useEffect(() => {
    !treserMovies && getMovieVideos();
  }, [movieId]);
};

export default useMovieTreser;
