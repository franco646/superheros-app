import axios from "../baseAxios";

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from "./auth.types";

const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

const loginUserSuccess = (token) => {
  localStorage.setItem("token", token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: token,
  };
};

const loginUserFailure = (error) => {
  localStorage.removeItem("token");
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
};

const logoutUser = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT_USER,
  };
};

const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(loginUserRequest());
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      return dispatch(loginUserSuccess(token));
    } catch (error) {
      dispatch(loginUserFailure(error.response.data));
    }
  };

export { loginUser, logoutUser, loginUserSuccess, loginUserFailure };
