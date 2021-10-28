import { createSelector } from "reselect";

import { TEAMS_FILTERS } from "../../constants";

const getTeams = (state) => state.teams.teams;
const getTeamScoreFilter = (state) => state.filter.score;

export const getTeamsByScore = createSelector(
  [getTeamScoreFilter, getTeams],
  (filter, teams) => {
    switch (filter) {
      case TEAMS_FILTERS.HIGHEST_SCORE: {
        return [...teams].sort(
          (a, b) => parseFloat(b.averages.total) - parseFloat(a.averages.total)
        );
      }
      case TEAMS_FILTERS.LOWEST_SCORE: {
        return [...teams].sort(
          (a, b) => parseFloat(a.averages.total) - parseFloat(b.averages.total)
        );
      }
      default: {
        return teams;
      }
    }
  }
);
