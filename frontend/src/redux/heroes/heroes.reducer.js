import {
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  CLEAR_HEROES,
} from "./heroes.type";

const initialState = {
  count: 0,
  heroes: [],
  isFetching: false,
};

const heroesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEROES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        heroes: [],
      };
    }
    case FETCH_HEROES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        count: action.payload.count,
        heroes: action.payload.heroes,
      };
    }
    case CLEAR_HEROES: {
      return {
        ...state,
        heroes: [],
        count: 0,
      };
    }
    default: {
      return state;
    }
  }
};

export default heroesReducer;
