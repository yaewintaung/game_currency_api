import express from "express";
import {
  changePassword,
  deleteUser,
  getUsers,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware";

const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.delete("/users/:id", deleteUser);

userRouter.post("/users/change-password/", isAuthenticated, changePassword);

export default userRouter;
