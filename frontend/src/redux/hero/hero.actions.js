import {
  FETCH_HERO_REQUEST,
  FETCH_HERO_SUCCESS,
  CLEAR_HERO,
} from "./hero.types";

import axios from "../baseAxios";

import { loginUserFailure } from "../auth/auth.actions";
import { redirect } from "../redirect/redirect.action";
import { setError } from "../error/error.actions";

const fetchHeroRequest = () => ({
  type: FETCH_HERO_REQUEST,
});

const fetchHeroSuccess = (hero) => ({
  type: FETCH_HERO_SUCCESS,
  payload: hero,
});

const clearHero = () => ({
  type: CLEAR_HERO,
});

const fetchHero = (id) => async (dispatch) => {
  dispatch(fetchHeroRequest());
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`heroes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const hero = response.data.hero;
    dispatch(fetchHeroSuccess(hero));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(loginUserFailure(error.response.data));
    }
    dispatch(redirect("/home"));
    dispatch(setError(error.response.data));
  }
};

export { fetchHero, clearHero };
