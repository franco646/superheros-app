import {
  FETCH_HERO_REQUEST,
  FETCH_HERO_SUCCESS,
  CLEAR_HERO,
} from "./hero.types";

const initialState = {
  hero: [],
  isFetching: false,
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
        heroes: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default heroReducer;
