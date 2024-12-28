import express from "express";
import { getUsers } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/users", getUsers);

export default userRouter;
