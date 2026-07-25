import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTreserVideo } from "../utils/movieSlice";

const useMovieTreser = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;

    let cancelled = false;

    // mark as "loading" so VideoBackground doesn't treat this as "no video" yet
    dispatch(addTreserVideo(undefined));

    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS,
      );
      const json = await data.json();
      const filterData = json.results.filter(
        (video) => video.type === "Teaser",
      );
      // explicit null = confirmed there's no trailer for this movie
      const treser = filterData[0] || json.results[0] || null;
      if (!cancelled) dispatch(addTreserVideo(treser));
    };

    getMovieVideos();

    return () => {
      cancelled = true;
    };
  }, [movieId, dispatch]);
};

export default useMovieTreser;
