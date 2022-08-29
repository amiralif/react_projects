import {
  LOGIN_FAILED,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_IN_PROGRESS,
  REGISTER_SUCCESS,
} from "../action-types/index";

import axios from "axios";
import jwtDecode from "jwt-decode";

export const register = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_IN_PROGRESS });

    try {
      const result = await axios.post("http://127.0.0.1:9000/auth/register", {
        email,
        password,
      });
    //   const decodedData = jwtDecode(result.data.access_token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: "OK",
      });
    } catch (e) {
      console.log("E: ", e);
      dispatch({ type: REGISTER_FAILED, payload: e.response.data.message });
    }
  };
};
