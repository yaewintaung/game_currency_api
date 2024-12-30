import { Request, Response } from "express";
import {
  createEmailVerify,
  getEmailVerifyByUID,
  loginUser,
  registerUser,
  removeEmailVerifyData,
  verifyCode,
} from "../services/auth.service";
import ErrorMessage from "../util/ErrorMessage";
import { generateToken } from "../util/token";
import { generateCode } from "../util/verifyCode";
import sendEmailOTP from "../util/sendEmailOTP";
import { getUserByEmail, verifyUser } from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    // create user by calling register function from service
    const user = await registerUser(username, email, password);
    // store verification data
    const code = generateCode();
    const expiredAt = new Date(Date.now() + 10 * 60 * 1000);
    await createEmailVerify(user.id, code, expiredAt);

    await sendEmailOTP(user.email, code);

    res.status(200).json({ message: "Check your Email for verify code" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(400).json({ error: "User not found." });
      return;
    }
    const uid = user.id;
    const verifyData = await getEmailVerifyByUID(uid);

    if (!verifyData) {
      res
        .status(400)
        .json({ error: "No verification code found for this user." });
      return;
    }
    if (new Date() > new Date(verifyData?.expiredAt!)) {
      res.status(400).json({ error: "Verification code has expired." });
      return;
    }

    const isVerify = await verifyCode(verifyData?.hashedCode, code);

    if (!isVerify) {
      res.status(400).json({ error: "Code not verify" });
      return;
    }

    const verifiedUser = await verifyUser(verifyData?.userId, true);

    await removeEmailVerifyData(verifyData?.id);
    const token = generateToken({ id: user.id });
    res
      .status(200)
      .json({ verifiedUser, token, message: "user is verified successful" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Call the login function from the service
    const user = await loginUser(email, password);
    const token = generateToken({ id: user.id });
    //send the token in the response
    // Send a response with the logged in user
    res.status(200).json({ user, token, message: "Logged in successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};
