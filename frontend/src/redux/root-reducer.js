import { combineReducers } from "redux";

import auth from "./auth/auth.reducer";
import teams from "./teams/teams.reducer";
import heroes from "./heroes/heroes.reducer";
import team from "./team/team.reducer";
import redirect from "./redirect/redirect.reducer";
import filter from "./filter/filter.reducer";
import error from "./error/error.reducer";
import hero from "./hero/hero.reducer";

export default combineReducers({
  auth,
  teams,
  heroes,
  team,
  redirect,
  filter,
  hero,
  error,
});
