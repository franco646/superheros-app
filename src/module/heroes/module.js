import HeroesController from "./controller/heroesController.js";
import HeroesService from "./service/heroesService.js";

import { heroesController } from "../../config/di.js";

const init = (app) => {
  heroesController.configureRoutes(app);
};

export { init, HeroesController, HeroesService };
