import express from "express";
import {
  login,
  register,
  verifyEmail,
} from "../controllers/authentication.controller";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify-email/", verifyEmail);
authRouter.post("/login", login);

export default authRouter;
