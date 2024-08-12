// functionality from users.ts moved to this script, making sure that Each layer has a clear responsibility
/* This script contains the business logic of the application
 Business logic definition: it determines how data may be shown, stored, created, and altered
 Interaction with userRepository: The service layer calls the repository layer to interact with the DB.
*/
import { hashPassword, comparePassword, generateToken } from '../middleware/auth';

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

// Mock Database
const users: User[] = [];

const signup = async ({ email, name, sub }: { email: string; name: string; sub: string }): Promise<string> => {
  let user = users.find(u => u.email === email);
  if (!user) {
    user = { id: sub, email, name, password: hashPassword(sub) };
    users.push(user);
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

export default {
  signup,
  signin,
};
