import { Game } from "@prisma/client";
import prisma from "../config/prisma";

export const getAllGames = async (): Promise<Game[]> => {
  return await prisma.game.findMany();
};

export const getGameById = async (id: string): Promise<Game | null> => {
  return await prisma.game.findUnique({ where: { id } });
};

export const getGameByGameName = async (
  gameName: string
): Promise<Game | null> => {
  return await prisma.game.findFirst({ where: { gameName } });
};

export const addNewGame = async (data: {
  gameName: string;
  image: string;
  description: string;
}): Promise<Game | null> => {
  return await prisma.game.create({ data });
};

export const editGame = async (
  id: string,
  data: { gameName?: string; image?: string; description?: string }
) => {
  return await prisma.game.update({
    where: { id: id },
    data,
  });
};

export const removeGame = async (id: string) => {
  await prisma.currencyPricing.deleteMany({ where: { gameId: id } });
  return await prisma.game.delete({ where: { id } });
};
