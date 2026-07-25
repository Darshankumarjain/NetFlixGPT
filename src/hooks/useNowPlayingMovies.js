import { useEffect } from "react";
import { TMDB_PROXY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (Store) => Store.movies.nowPlayingMovies,
  );

  const getNowPlayingMovies = async () => {
    const data = await fetch(`${TMDB_PROXY}?path=movie/now_playing&page=1`);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
