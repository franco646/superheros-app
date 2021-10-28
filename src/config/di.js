import dotenv from "dotenv";
dotenv.config();

import { HeroesController, HeroesService } from "../module/heroes/module.js";
import { AuthController, AuthMiddleware } from "../module/Auth/module.js";
import {
  TeamController,
  TeamModel,
  TeamRepository,
} from "../module/team/module.js";

import { Sequelize } from "sequelize";
import axios from "axios";
import jwt from "jsonwebtoken";

const configureSequelizeDatabase = () => {
  return new Sequelize({
    dialect: "sqlite",
    storage: process.env.DATABASE_PATH,
  });
};

const sequelize = configureSequelizeDatabase();

const authController = new AuthController(jwt);
const authMiddleware = new AuthMiddleware(jwt);

const heroesService = new HeroesService(axios);
const heroesController = new HeroesController(authMiddleware, heroesService);

const teamModel = TeamModel.setup(sequelize);
const teamRepository = new TeamRepository(teamModel);
const teamController = new TeamController(
  authMiddleware,
  teamRepository,
  heroesService
);

export { heroesController, authController, teamController, sequelize };
