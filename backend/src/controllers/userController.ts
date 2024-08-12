// functionality from users.ts moved to this script, making sure that Each layer has a clear responsibility
// Handles HTTP requests and responses, interacting with the service layer.
import { Request, Response } from 'express';
import userService from '../services/userService';

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, sub } = req.body.user;
    const token = await userService.signup({ email, name, sub });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const signin = async (req: Request, res: Response): Promise<void> => {
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

export default {
  signup,
  signin,
};
