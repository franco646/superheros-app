import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  SAVE_TEAM_REQUEST,
  SAVE_TEAM_SUCCESS,
  CLEAR_TEAM,
} from "./team.types";

const initialState = {
  team: { heroes: [], name: "" },
  isFetching: false,
  isSaving: false,
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAM_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case FETCH_TEAM_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        team: action.payload,
      };
    }
    case SAVE_TEAM_REQUEST: {
      return {
        ...state,
        isSaving: true,
      };
    }
    case SAVE_TEAM_SUCCESS: {
      return {
        ...state,
        team: { heroes: [], name: "" },
        isSaving: false,
      };
    }
    case CLEAR_TEAM: {
      return {
        ...state,
        team: { heroes: [], name: "" },
      };
    }
    default: {
      return state;
    }
  }
};

export default teamReducer;
