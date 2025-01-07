import { Request, Response } from "express";
import {
  addNewGame,
  editGame,
  getAllGames,
  getGameByGameName,
  getGameById,
  removeGame,
} from "../services/game.service";
import ErrorMessage from "../util/ErrorMessage";

import { uploadCloudinary, deleteFile } from "../util/uploadCloudinary";
import { uniqueNameGen } from "../util/generators";

const cloudinaryFolderName: string = "game_images";

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
    const { gameName, description } = req.body;

    const existingGame = await getGameByGameName(gameName);
    if (existingGame) {
      res.status(400).json({ message: "Game already exists" });
      return;
    }

    if (!req.file) {
      res.status(404).json({ message: "file not found" });
      return;
    }
    const { path, originalname } = req.file;
    const fileName = uniqueNameGen(originalname);
    const publicId = fileName.substring(0, fileName.lastIndexOf("."));
    const uploadFile = await uploadCloudinary(
      path,
      publicId,
      cloudinaryFolderName
    );

    if (!uploadFile) {
      res.status(400).json({ message: "Error uploading image" });
      return;
    }
    // Call the createNewGame function from the service
    const game = await addNewGame({
      gameName,
      image: fileName,
      description,
    });
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
    const { gameName, description } = req.body;

    const game = await getGameById(id);
    let fileName;

    if (!game) {
      res.status(404).json({ message: "Game not found" });
      return;
    }
    fileName = game.image;

    if (req.file) {
      if (game.image) {
        const resultDeleteImage = await deleteFile(
          game.image,
          cloudinaryFolderName
        );
      }
      const { path, originalname } = req.file;
      fileName = uniqueNameGen(originalname);
      const publicId = fileName.substring(0, fileName.lastIndexOf("."));
      const uploadFile = await uploadCloudinary(
        path,
        publicId,
        cloudinaryFolderName
      );
    }

    // Call the updateGame function from the service
    const updatedGame = await editGame(id, {
      gameName,
      image: fileName as string,
      description,
    });
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
    const game = await getGameById(id);
    if (!game) {
      res.status(404).json({ message: "Game not found" });
      return;
    }
    if (game.image) {
      await deleteFile(game.image, cloudinaryFolderName);
    }

    // Call the deleteGame function from the service
    await removeGame(id);
    // Send a response with the message
    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};
