import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret: string = process.env.JWT_SECRET || "Ya_AUTH_SEC";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
};
