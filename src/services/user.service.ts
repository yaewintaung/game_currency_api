import { User } from "@prisma/client";
import prisma from "../config/prisma";

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createNewUser = async (
  email: string,
  username: string,
  password: string
) => {
  return await prisma.user.create({ data: { email, username, password } });
};
