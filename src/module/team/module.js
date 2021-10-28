import TeamController from "./controller/teamController.js";
import TeamRepository from "./repository/teamRepository.js";
import TeamModel from "./model/teamModel.js";

import { teamController } from "../../config/di.js";

const init = (app) => {
  teamController.configureRoutes(app);
};

export { init, TeamController, TeamRepository, TeamModel };
