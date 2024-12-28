import prisma from "../config/prisma";
import { createNewUser, getUserByEmail } from "./user.service";
import * as argon2 from "argon2";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await argon2.hash(password);
  const newUser = await createNewUser(email, username, hashedPassword);
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password)
    throw new Error("User not found");
  const isValidPassword = await argon2.verify(existingUser?.password, password);
  if (!isValidPassword) throw new Error("Incorrect password");
  const { password: _, ...user } = existingUser;
  return user;
};
