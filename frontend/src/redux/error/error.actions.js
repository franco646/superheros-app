import { SET_ERROR_MESSAGE, CLEAR_ERROR_MESSAGE } from "./error.types";

const setErrorMessage = (error) => ({
  type: SET_ERROR_MESSAGE,
  payload: error,
});

const clearErrorMessage = () => ({
  type: CLEAR_ERROR_MESSAGE,
});

const setError = (error) => (dispatch) => {
  dispatch(setErrorMessage(error));
  setTimeout(() => {
    dispatch(clearErrorMessage());
  }, 5000);
};

export { setError };
