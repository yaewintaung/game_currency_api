import express from "express";
import {
  createGame,
  deleteGame,
  getGame,
  getGames,
  updateGame,
} from "../controllers/game.controller";
import { getCurrenciesByGameId } from "../controllers/currency.controller";
import { isAuthenticated } from "../middleware";

const gameRouter = express.Router();

gameRouter.get("/games/", isAuthenticated, getGames);
gameRouter.get("/games/:id", getGame);
gameRouter.get("/games/currency/:gameId", getCurrenciesByGameId);
gameRouter.post("/games", createGame);
gameRouter.patch("/games/:id", updateGame);
gameRouter.delete("/games/:id", deleteGame);

export default gameRouter;
