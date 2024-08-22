import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, sub } = req.body.user;
    const token = await userService.signup({ email, name, sub });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, sub } = req.body.user;
    const token = await userService.signin({ email, sub });
    if (token) {
      res.json({ token });
    } else {
      res.status(401).send('Authentication failed');
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
