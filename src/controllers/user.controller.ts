import { Request, Response } from "express";
import {
  changeUserPassword,
  getAllUsers,
  removeUser,
} from "../services/user.service";
import ErrorMessage from "../util/ErrorMessage";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(200).json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await removeUser(id);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const changePassword = async (req: Request | any, res: Response) => {
  try {
    const { id } = req.user;
    if (!id) {
      res.status(403).json({ message: "user is not authenticated" });
    }

    const { prevPassword, newPassword } = req.body;
    await changeUserPassword(id, prevPassword, newPassword);
    res.status(200).json({ message: "password changed successfully!" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};
