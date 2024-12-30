import { User } from "@prisma/client";
import prisma from "../config/prisma";
import argon2 from "argon2";

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

export const verifyUser = async (id: string, verified: boolean) => {
  return await prisma.user.update({ where: { id }, data: { verified } });
};

export const createNewUser = async (
  email: string,
  username: string,
  password: string
) => {
  return await prisma.user.create({ data: { email, username, password } });
};

export const removeUser = async (id: string) => {
  await prisma.emailVerification.deleteMany({ where: { userId: id } });
  return await prisma.user.delete({ where: { id } });
};

export const changeUserPassword = async (
  id: string,
  prePass: string,
  newPass: string
) => {
  const user = await getUserById(id);

  if (!user) {
    throw new Error("user is not found");
  }
  const passwordIsMatch = await argon2.verify(user.password!, prePass);
  if (!passwordIsMatch) {
    throw new Error("password is incorrect");
  }
  const hashedNewPassword = await argon2.hash(newPass);
  return await prisma.user.update({
    where: { id },
    data: { password: hashedNewPassword },
  });
};
