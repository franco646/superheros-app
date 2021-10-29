import {
  FETCH_HERO_REQUEST,
  FETCH_HERO_SUCCESS,
  CLEAR_HERO,
} from "./hero.types";

const initialState = {
  hero: {},
  isFetching: true,
};

const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HERO_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case FETCH_HERO_SUCCESS: {
      return {
        ...state,
        hero: action.payload,
        isFetching: false,
      };
    }
    case CLEAR_HERO: {
      return {
        ...state,
        hero: {},
        isFetching: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default heroReducer;
