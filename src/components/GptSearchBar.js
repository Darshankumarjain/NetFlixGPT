import { useRef } from "react";
import openai from "../utils/openai";
import { TMDB_PROXY } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { useDispatch } from "react-redux";

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `${TMDB_PROXY}?path=search/movie&query=${encodeURIComponent(
        movie.trim(),
      )}&include_adult=false&language=en-US&page=1`,
    );

    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    // Make an API call to GPT API and get Movie Results

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query" +
      searchText.current.value +
      ". only give me names of 5 Movies only, commo seperated like the example result given ahead. Exapmle Result: Movie1, Movie2, Movie3, Movie4, Movie5";

    const gptResults = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [{ role: "user", content: gptQuery }],
    });

    if (!gptResults.choices) {
      // TODO: write error handling
    }
    const gptMovies = gptResults.choices?.[0].message?.content.split(",");

    // For each movie i will search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // i will get results of [promise, promise, promise, promise, promise] i will not happend immediately

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }),
    );
  };

  return (
    <div className="pt-[40%] md:pt-[10%]  flex justify-center">
      <form
        className="bg-black rounded-2xl w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder="What would you like to watch today?"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;