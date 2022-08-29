import axios from "axios";

import {
  MOVIE_LIST,
  CREATE_MOVIE,
  DELETE_MOVIE,
  UPDATE_MOVIE,
  VIEW_MOVIE,
} from "../action-types";

export const movieList = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const result = await axios.get("http://127.0.0.1:9000/movies", {
      headers: { authorization: `Bearer ${state.login.data.token}` },
    });
    dispatch({ type: MOVIE_LIST, payload: result.data });
  };
};

export const movieDetails = (movieId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await axios.get(
      `http://127.0.0.1:9000/movies/${movieId}`,
      { headers: { authorization: `Bearer ${state.login.data.token}` } }
    );
    dispatch({ type: VIEW_MOVIE, payload: response.data });
  };
};
