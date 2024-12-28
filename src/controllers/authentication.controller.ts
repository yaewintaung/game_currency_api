import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import ErrorMessage from "../util/ErrorMessage";
import { generateToken } from "../util/token";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    // Call the register function from the service
    const user = await registerUser(username, email, password);
    const token = generateToken({ id: user.id });
    //send the token in the response
    // Send a response with the created user
    res.status(200).json({ user, token, message: "User created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json("An error occurred");
    }
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
