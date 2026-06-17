import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    treserVideo: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTreserVideo: (state, action) => {
      state.treserVideo = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTreserVideo } = movieSlice.actions;

export default movieSlice.reducer;
