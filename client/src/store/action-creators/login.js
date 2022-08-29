import {
  LOGIN_FAILED,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../action-types";

import { toast } from "react-toastify";

import axios from "axios";
import jwtDecode from "jwt-decode";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_IN_PROGRESS });

    try {
      const result = await axios.post("http://127.0.0.1:9000/auth/login", {
        email,
        password,
      });
      const decodedToken = jwtDecode(result.data.access_token);

      localStorage.setItem("token", result.data.access_token);
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("iat", decodedToken.iat);
      localStorage.setItem("exp", decodedToken.exp);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: result.data.access_token,
          email: decodedToken.email,
          iat: decodedToken.iat,
          exp: decodedToken.exp,
        },
      });
      dispatch(automaticLogout(decodedToken.exp));
    } catch (e) {
      console.log("E: ", e);
      dispatch({ type: LOGIN_FAILED, payload: e.response.data.message });
    }
  };
};

export const logout = (type) => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("iat");
  localStorage.removeItem("exp");
  if (type === "normal") {
    toast.error("You were Logged Out !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return { type: LOGOUT };
};

export const automaticLogout = (expireTime) => {
  const milliSecondsToActive =
    new Date(expireTime * 1000).getTime() - new Date().getTime();
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout("normal"));
    }, milliSecondsToActive);
  };
};

export const checkAuthenticateStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expireTime = new Date(parseInt(localStorage.getItem("exp")) * 1000);
      if (expireTime <= new Date()) {
        dispatch(logout());
      } else {
        const email = localStorage.getItem("email");
        const exp = parseInt(localStorage.getItem("exp"));
        const iat = parseInt(localStorage.getItem("iat"));

        dispatch({ type: LOGIN_SUCCESS, payload: { token, email, exp, iat } });
      }
    }
  };
};
