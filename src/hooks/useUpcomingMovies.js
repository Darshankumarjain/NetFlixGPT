import { useEffect } from "react";
import { TMDB_PROXY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const upComingMovies = useSelector((Store) => Store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    const data = await fetch(`${TMDB_PROXY}?path=movie/upcoming&page=1`);
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    !upComingMovies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
