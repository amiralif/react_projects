import _ from "lodash";

import {
  CREATE_MOVIE,
  DELETE_MOVIE,
  MOVIE_LIST,
  UPDATE_MOVIE,
  VIEW_MOVIE,
} from "../action-types";

export const movieReducer = (state, action) => {
  switch (action.type) {
    case MOVIE_LIST:
      return { ...state.movie, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
