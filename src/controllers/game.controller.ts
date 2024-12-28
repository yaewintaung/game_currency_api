import { Request, Response } from "express";
import {
  addNewGame,
  editGame,
  getAllGames,
  getGameById,
  removeGame,
} from "../services/game.service";
import ErrorMessage from "../util/ErrorMessage";

export const getGames = async (req: Request, res: Response) => {
  try {
    // Call the getAllGames function from the service
    const games = await getAllGames();
    // Send a response with the games
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const getGame = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    // Call the getGameById function from the service
    const game = await getGameById(id);
    if (!game) {
      res.status(404).json({ message: "Game not found" });
      return;
    }
    // Send a response with the game
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const createGame = async (req: Request, res: Response) => {
  try {
    const { gameName, image, description } = req.body;
    // Call the createNewGame function from the service
    const game = await addNewGame({ gameName, image, description });
    // Send a response with the created game
    res.status(200).json({ game, message: "Game created successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const updateGame = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { gameName, image, description } = req.body;
    const game = getGameById(id);
    if (!game) {
      res.status(404).json({ message: "Game not found" });
      return;
    }
    // Call the updateGame function from the service
    const updatedGame = await editGame(id, { gameName, image, description });
    // Send a response with the updated game
    res.status(200).json({ updatedGame, message: "Game updated successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const deleteGame = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const game = getGameById(id);
    if (!game) {
      res.status(404).json({ message: "Game not found" });
      return;
    }
    // Call the deleteGame function from the service
    await removeGame(id);
    // Send a response with the message
    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};
