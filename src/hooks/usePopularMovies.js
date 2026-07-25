import { useEffect } from "react";
import { TMDB_PROXY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const popularMovies = useSelector((Store) => Store.movies.popularMovies);

  const getPopularMovies = async () => {
    const data = await fetch(`${TMDB_PROXY}?path=movie/popular&page=1`);
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
