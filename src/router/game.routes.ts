import express from "express";
import { getUsers } from "../controllers/user.controller";
import {
  createGame,
  deleteGame,
  getGame,
  getGames,
  updateGame,
} from "../controllers/game.controller";
import { getCurrenciesByGameId } from "../controllers/currency.controller";

const gameRouter = express.Router();

gameRouter.get("/games", getGames);
gameRouter.get("/games/:id", getGame);
gameRouter.get("/games/currency/:id", getCurrenciesByGameId);
gameRouter.post("/games", createGame);
gameRouter.patch("/games/:id", updateGame);
gameRouter.delete("/games/:id", deleteGame);

export default gameRouter;
