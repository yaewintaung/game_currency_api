import { Request, Response } from "express";
import { createNewUser, getAllUsers } from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(200).json(users);
};
