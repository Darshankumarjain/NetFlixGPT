import { useEffect } from "react";
import { TMDB_PROXY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const topRatedMovies = useSelector((Store) => Store.movies.topRatedMovies);

  const getTotRatedMovies = async () => {
    const data = await fetch(`${TMDB_PROXY}?path=movie/top_rated&page=1`);
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    !topRatedMovies && getTotRatedMovies();
  }, []);
};

export default useTopRatedMovies;
