import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

import {
  returnError,
  logErrorMiddleware,
} from "./module/error/errorHandler.js";

import { init as initHeroesModule } from "./module/heroes/module.js";
import { init as initAuthModule } from "./module/auth/module.js";
import { init as initTeamModule } from "./module/team/module.js";

import bodyParser from "body-parser";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

initAuthModule(app);
initHeroesModule(app);
initTeamModule(app);

app.use(logErrorMiddleware);
app.use(returnError);

const port = process.env.PORT || 8080;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(port);
