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

export const createMovie = (name, description, onSuccess) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();

  const month = months[date.getMonth()];

  return async (dispatch, getState) => {
    const state = getState();
    const response = await axios.post(
      "http://127.0.0.1:9000/movies",
      {
        name: name,
        description: description,
        creator: state.login.data.email,
        createDate: month + " ," + date.getDay(),
      },
      { headers: { authorization: `Bearer ${state.login.data.token}` } }
    );
    dispatch({ type: CREATE_MOVIE, payload: response.data });
    onSuccess();
  };
};

export const updateMovie = (id, name, description, onSuccess) => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await axios.patch(
      `http://127.0.0.1:9000/movies/${id}`,
      { name, description },
      { headers: { authorization: `Bearer ${state.login.data.token}` } }
    );
    dispatch({ type: UPDATE_MOVIE, payload: response.data });
    onSuccess();
  };
};

export const deleteMovie = (id, navigate) => {
  return async (dispatch, getState) => {
    const state = getState();
    await axios.delete(`http://127.0.0.1:9000/movies/${id}`, {
      headers: { authorization: `Bearer ${state.login.data.token}` },
    });
    dispatch({ type: DELETE_MOVIE, payload: id });
    navigate();
  };
};
