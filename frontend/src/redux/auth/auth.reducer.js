import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from "./auth.types";

const initialState = {
  isAuthenticating: true,
  isAuthenticated: false,
  errorMessage: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        isAuthenticating: true,
        errorMessage: "",
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        errorMessage: "",
      };
    }
    case LOGIN_USER_FAILURE: {
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        errorMessage: action.payload,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
