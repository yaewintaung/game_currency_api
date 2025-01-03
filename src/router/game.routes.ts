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
import upload from "../middleware/fileUpload";

const gameRouter = express.Router();

gameRouter.get("/games/", getGames);
gameRouter.get("/games/:id", getGame);
gameRouter.get("/games/currency/:gameId", getCurrenciesByGameId);
gameRouter.post("/games", upload.single("image"), createGame);
gameRouter.patch("/games/:id", upload.single("image"), updateGame);
gameRouter.delete("/games/:id", deleteGame);

export default gameRouter;
