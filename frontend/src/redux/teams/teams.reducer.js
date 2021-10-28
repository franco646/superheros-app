import {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  DELETE_TEAM_SUCCESS,
} from "./teams.types";

const initialState = {
  teams: [],
  isFetching: false,
};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAMS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case FETCH_TEAMS_SUCCESS: {
      return {
        ...state,
        teams: action.payload,
        isFetching: false,
      };
    }
    case DELETE_TEAM_SUCCESS: {
      return {
        ...state,
        teams: state.teams.filter((team) => team.id !== action.payload.id),
      };
    }
    default: {
      return state;
    }
  }
};

export default teamsReducer;
