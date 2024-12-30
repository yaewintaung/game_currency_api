import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserById } from "../services/user.service";
dotenv.config();

export const isAuthenticated = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      res.status(400).json({ message: "token not found" });
      return;
    }
    const token = authorizationHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "Ya_AUTH_SEC";
    const decodedData = jwt.verify(token, secret);
    const { id } = decodedData as any;
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    if (!user.verified) {
      res.status(403).json({ message: "user is not verify" });
      return;
    }
    req.user = user;

    return next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
