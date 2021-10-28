import { REDIRECT, CLEAR_REDIRECT } from "./redirect.type";

const redirectReducer = (state = {}, action) => {
  switch (action.type) {
    case REDIRECT:
      return { redirectTo: action.payload };
    case CLEAR_REDIRECT:
      return {};
    default:
      return state;
  }
};

export default redirectReducer;
