import { User } from '../models/User'; // Import the shared User interface
import { hashPassword, comparePassword, generateToken } from '../middleware/auth';
import * as userRepository from '../repositories/userRepository';

const users: User[] = [];

export const signup = async ({ email, name, sub }: { email: string; name: string; sub: string }): Promise<string> => {
  let user = users.find(u => u.email === email);
  
  if (!user) {
    user = {
      id: Number(sub),
      email,
      name,
      password: hashPassword(sub),
      verify: false,  // Assuming new users are not verified by default
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null
    };
    users.push(user);  // Add the new user to the in-memory array
  }
  
  return generateToken({ id: user.id, email: user.email });
};

export const signin = async ({ email, sub }: { email: string; sub: string }): Promise<string | null> => {
  const user = users.find(u => u.email === email);
  if (user && comparePassword(sub, user.password)) {
    return generateToken({ id: user.id, email: user.email });
  }
  return null;
};

//async added in case we need to add more logic that includes async operations in the future
export const getAllUsers = async (): Promise<User[]> => { 
  return userRepository.findAllUsers();
};

export const createUser = async ({ name, email, password }: { name: string; email: string; password: string }): Promise<User> => {
  const hashedPassword = hashPassword(password);
  const user = await userRepository.saveUser({ name, email, password: hashedPassword });
  return user;
};

export const updateUser = async (id: string, updates: Partial<User>) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }

  // Apply partial updates to the user object
  Object.assign(user, updates);

  // Save the updated user back to the database
  return await userRepository.saveUser(user);
};

// Find User By Id
export const getUserById = async (id: string) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// This function will delete the user from the DB
export const deleteUser = async (id: string): Promise<void> => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  await userRepository.deleteUser(id);
};