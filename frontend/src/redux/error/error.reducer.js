import { SET_ERROR_MESSAGE, CLEAR_ERROR_MESSAGE } from "./error.types";

const initialState = {
  error: "",
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case CLEAR_ERROR_MESSAGE: {
      return {
        ...state,
        error: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default errorReducer;
