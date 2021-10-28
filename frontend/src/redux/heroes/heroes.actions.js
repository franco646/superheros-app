import {
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  CLEAR_HEROES,
} from "./heroes.type";

import axios from "axios";
import axiosInstance from "../baseAxios";

import { loginUserFailure } from "../auth/auth.actions";
import { redirect } from "../redirect/redirect.action";
import { setError } from "../error/error.actions";

let source;

const fetchHeroesRequest = () => ({
  type: FETCH_HEROES_REQUEST,
});

const fetchHeroesSuccess = (data) => ({
  type: FETCH_HEROES_SUCCESS,
  payload: {
    count: data.count,
    heroes: data.heroes,
    page: data.page,
  },
});

const clearHeroes = () => ({
  type: CLEAR_HEROES,
});

const fetchHeroesBySearchParam =
  (searchParam, offset = 0) =>
  async (dispatch, getStore) => {
    const { heroes } = getStore();
    if (heroes.isFetching) {
      source.cancel("Operation canceled");
    }

    dispatch(fetchHeroesRequest());

    const CancelToken = axios.CancelToken;
    source = CancelToken.source();

    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(
        `heroes/search/${searchParam}?limit=12&offset=${offset}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cancelToken: source.token,
        }
      );
      const data = response.data;
      dispatch(fetchHeroesSuccess(data));
    } catch (error) {
      if (axios.isCancel(error)) {
        return null;
      }
      if (error.response.status === 401) {
        return dispatch(loginUserFailure(error.response.data));
      }
      if (error.response.status === 404) {
        return dispatch(fetchHeroesSuccess({ heroes: [], count: 0 }));
      }
      dispatch(redirect("/home"));
      dispatch(setError(error.response.data));
    }
  };

export { fetchHeroesBySearchParam, clearHeroes };
