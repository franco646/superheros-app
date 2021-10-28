import { REDIRECT, CLEAR_REDIRECT } from "./redirect.type";

const clearRedirect = () => ({
  type: CLEAR_REDIRECT,
});

const redirectTo = (link) => ({
  type: REDIRECT,
  payload: link,
});

export const redirect = (link) => (dispatch) => {
  dispatch(redirectTo(link));
  setTimeout(() => {
    dispatch(clearRedirect());
  }, 300);
};
