import AuthController from "./controller/authController.js";
import AuthMiddleware from "./middleware/authMiddleware.js";

import { authController } from "../../config/di.js";

const init = (app) => {
  authController.configureRoutes(app);
};

export { init, AuthController, AuthMiddleware };
