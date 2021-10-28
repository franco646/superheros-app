import { SET_TEAM_SCORE_FILTER } from "./filter.types";

const setTeamScoreFilter = (filter) => ({
  type: SET_TEAM_SCORE_FILTER,
  payload: filter,
});

export { setTeamScoreFilter };
