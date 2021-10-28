import { SET_TEAM_SCORE_FILTER } from "./filter.types";
import { TEAMS_FILTERS } from "../../constants";

const initialState = {
  score: TEAMS_FILTERS.HIGHEST_SCORE,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAM_SCORE_FILTER: {
      return {
        ...state,
        score: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default filterReducer;
