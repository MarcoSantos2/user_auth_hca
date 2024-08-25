import { Request, Response } from 'express';
import * as userService from '../services/userService';

// TODO fix all error codes

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
    res.status(200).json(users);  // Send the list of users as a JSON response
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Handles creating a user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body; // Get name, email, and password from request body
    const user = await userService.createUser({ name, email, password }); // Call the service layer to create the user
    res.status(201).json(user); // Respond with the created user
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Extract the user ID from the URL parameters and new data from the request body, then call the service layer to apply the updates
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const updates = req.body; // Partial updates provided in the request body
    const updatedUser = await userService.updateUser(userId, updates);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

// Extract the user ID from the URL parameters and new data from the request body, then call the service layer to apply the updates
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
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