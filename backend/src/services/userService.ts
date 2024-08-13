// functionality from users.ts moved to this script, making sure that Each layer has a clear responsibility
/* This script contains the business logic of the application
 Business logic definition: it determines how data may be shown, stored, created, and altered
 Interaction with userRepository: The service layer calls the repository layer to interact with the DB.
*/

import { User } from '../models/User'; // Import the shared User interface
import { hashPassword, comparePassword, generateToken } from '../middleware/auth';
import userRepository from '../repositories/userRepository';

const users: User[] = [];

const signup = async ({ email, name, sub }: { email: string; name: string; sub: string }): Promise<string> => {
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

const signin = async ({ email, sub }: { email: string; sub: string }): Promise<string | null> => {
  const user = users.find(u => u.email === email);
  if (user && comparePassword(sub, user.password)) {
    return generateToken({ id: user.id, email: user.email });
  }
  return null;
};

const getAllUsers = async (): Promise<User[]> => { // Use the shared User interface
  return await userRepository.findAll();  
};

export default {
  signup,
  signin,
  getAllUsers,
};
