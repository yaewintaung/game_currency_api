import prisma from "../config/prisma";
import { createNewUser, getUserByEmail, getUserById } from "./user.service";
import * as argon2 from "argon2";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) throw new Error("User already exists hee");

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

export const createEmailVerify = async (
  userId: string,
  code: string,
  expiredAt: any
) => {
  const exitingVerification = await prisma.emailVerification.findFirst({
    where: { userId },
  });
  console.log(exitingVerification);

  if (exitingVerification) {
    throw new Error("user already exist");
  }
  const hashedCode = await argon2.hash(code);
  return await prisma.emailVerification.create({
    data: { userId, hashedCode, expiredAt },
  });
};

export const getEmailVerifyByUID = async (id: string) => {
  return await prisma.emailVerification.findFirst({
    where: { userId: id },
  });
};

export const verifyCode = async (hashedCode: string, code: string) => {
  return await argon2.verify(hashedCode, code);
};

export const removeEmailVerifyData = async (id: string) => {
  return await prisma.emailVerification.delete({ where: { id } });
};
