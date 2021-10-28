import {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  DELETE_TEAM_SUCCESS,
} from "./teams.types";

import axios from "../baseAxios";

import { loginUserFailure } from "../auth/auth.actions";
import { redirect } from "../redirect/redirect.action";
import { setError } from "../error/error.actions";

const fetchTeamsRequest = () => ({
  type: FETCH_TEAMS_REQUEST,
});

const fetchTeamsSuccess = (teams) => ({
  type: FETCH_TEAMS_SUCCESS,
  payload: teams,
});

const fetchTeams = () => async (dispatch) => {
  dispatch(fetchTeamsRequest());
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/teams", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const teams = response.data.teams;
    dispatch(fetchTeamsSuccess(teams));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(loginUserFailure(error.response.data));
    }
    dispatch(redirect("/home"));
    dispatch(setError(error.response.data));
  }
};

const deleteTeamSuccess = (team) => ({
  type: DELETE_TEAM_SUCCESS,
  payload: team,
});

const deleteTeam = (team) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`/teams/delete/${team.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(deleteTeamSuccess(team));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(loginUserFailure(error.response.data));
    }
    dispatch(redirect("/home"));
    dispatch(setError(error.response.data));
  }
};

export { deleteTeam, fetchTeams };
