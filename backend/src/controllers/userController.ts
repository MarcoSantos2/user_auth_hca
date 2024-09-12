// Management of the API interface to the business logic

import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, sub } = req.body.user;
    if (!email || !name || !sub) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const token = await userService.signup({ email, name, sub });
    res.status(201).json({ token });
  } catch (error) {
    if ((error as Error).message.includes('already exists')) {
      res.status(409).json({ message: 'User already exists' });
    } else {
      res.status(500).json({ message: (error as Error).message });
    }
  }
};

// As more signin methods are added, this function needs to be updated with the new methods
export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, user } = req.body;

    if (!user && !(email && password)) {
      res.status(400).json({ message: 'Missing required fields' }); 
    } else {
      const payload = user ? {user} : {email, password};
      const token = await userService.signIn(payload);
      if (token) {
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Authentification failed' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers(true);
    res.status(200).json(users);  // Send users' UUID, name, and email as a JSON response
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Handles creating a user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body; // Get name, email, and password from request body
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    } 
    const user = await userService.createUser({ name, email, password }); // Call the service layer to create the user
    res.status(201).json(user); //Respond with the created user's name, UUID, and email
  } catch (error) {
    if ((error as Error).message.includes('already exists')) {
      res.status(409).json({ message: 'User already exists' });
    } else {
      res.status(500).json({ message: (error as Error).message });
    }
  }
};

// Extract the user ID from the URL parameters and new data from the request body, then call the service layer to apply the updates
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(400).json({ message: 'Missing user ID' });
      return;
    }
    const updates = req.body; // Partial updates provided in the request body
    const updatedUser = await userService.updateUser(userId, updates);
    if (updatedUser) {
      const result = {
        uuid: updatedUser.uuid,
        name: updatedUser.name,
        email: updatedUser.email,
      };
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

// Extract the user ID from the URL parameters and new data from the request body, then call the service layer to apply the updates
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userUuid = req.params.id;
    if (!userUuid) {
      res.status(400).json({ message: 'Missing user ID' });
      return;
    }
    const user = await userService.getUserByUuid(userUuid);
    if (user) {
      const result = {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
      };
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// This function will extract the user ID from the URL parameters, call the service layer to delete the user, and respond to the client
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addRoleToUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, uuid } = req.params;
    const user = await userService.addRoleToUser(uuid, slug);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
