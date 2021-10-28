import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  SAVE_TEAM_REQUEST,
  SAVE_TEAM_SUCCESS,
  CLEAR_TEAM,
} from "./team.types";

import axios from "../baseAxios";

import { redirect } from "../redirect/redirect.action";
import { loginUserFailure } from "../auth/auth.actions";
import { setError } from "../error/error.actions";

const fetchTeamRequest = () => ({
  type: FETCH_TEAM_REQUEST,
});

const fetchTeamSuccess = (team) => ({
  type: FETCH_TEAM_SUCCESS,
  payload: team,
});

const saveTeamRequest = () => ({
  type: SAVE_TEAM_REQUEST,
});

const saveTeamSuccess = () => ({
  type: SAVE_TEAM_SUCCESS,
});

const fetchTeam = (id) => async (dispatch) => {
  dispatch(fetchTeamRequest());
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`teams/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('RESPONSE: ', response)
    const team = response.data.team;
    console.log('FETCHED TEAM: ', team)
    dispatch(fetchTeamSuccess(team));
  } catch (error) {
    console.log('ERROR: ', error)
    if (error.response.status === 401) {
      dispatch(loginUserFailure(error.response.data));
    }
    dispatch(redirect("/home"));
    dispatch(setError(error.response.data));
  }
};

const saveTeam = (team) => async (dispatch) => {
  dispatch(saveTeamRequest());
  try {
    const token = localStorage.getItem("token");
    await axios.post("/teams/save", team, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(saveTeamSuccess());
    dispatch(redirect("/home"));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(loginUserFailure(error.response.data));
    }
    dispatch(redirect("/home"));
    dispatch(setError(error.response.data));
  }
};

const clearTeam = () => ({
  type: CLEAR_TEAM,
});

export { saveTeam, fetchTeam, clearTeam };
