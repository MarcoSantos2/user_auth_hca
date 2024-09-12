// Business logic implementation

import { User } from '../models/User'; // Import the shared User interface
import { hashPassword, comparePassword, generateToken } from '../middleware/auth';
import * as userRepository from '../repositories/userRepository';
import * as roleService from '../services/roleService';


export const signup = async ({ email, name, sub }: { email: string; name: string; sub: string }): Promise<string | null> => {
  // Check if the user already exists in the repository
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create and save the new user using TypeORM
  const newUser = await userRepository.createUser({
    email,
    name,
    password: hashPassword(sub),  // Hash the password
    verify: false,  // Assuming new users are not verified by default
  });

  if (newUser) {
    return generateToken({ uuid: newUser.uuid, email: newUser.email });
  }
  return null;  // Return the full user object including the generated UUID
};

//TODO Move to a new Types file
interface DirectLoginPayload {
  email: string;
  password: string;
}
interface ExternalLoginPayload {
  user: {
    email: string;
    sub: string;
  }
}

export const signIn = async (payload: DirectLoginPayload | ExternalLoginPayload): Promise<string | null> => {
  const userEmail = "user" in payload ? payload.user.email : payload.email;
  const userPassword = "user" in payload ? payload.user.sub : payload.password;
  const dbUser = await userRepository.findUserByEmail(userEmail);
  if (dbUser && comparePassword(userPassword, dbUser.password)) {
    return generateToken({ uuid: dbUser.uuid, email: dbUser.email });
  }
  return null;
};

//async added in case we need to add more logic that includes async operations in the future
export const getAllUsers = async (withRoles?: boolean): Promise<User[]> => { 
  return userRepository.findAllUsers(withRoles);
};

export const createUser = async ({ name, email, password }: { name: string; email: string; password: string }): Promise<User> => {
  const hashedPassword = hashPassword(password);
  const user = await userRepository.createUser({ name, email, password: hashedPassword });
  return user;
};

export const updateUser = async (uuid: string, updates: Partial<User>) => {
  const user = await userRepository.findUserByUuid(uuid);
  if (!user) {
    throw new Error('User not found');
  }

  // Apply partial updates to the user object
  Object.assign(user, updates);

  // Save the updated user back to the database
  return await userRepository.saveUser(user);
};

// Find User By UUID
export const getUserByUuid = async (uuid: string, withRoles?: boolean) => {
  const user = await userRepository.findUserByUuid(uuid, withRoles);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Find User By ID
export const getUserById = async (id: number) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// This function will delete the user from the DB
export const deleteUser = async (uuid: string): Promise<void> => {
  const user = await userRepository.findUserByUuid(uuid);
  if (!user) {
    throw new Error('User not found');
  }
  await userRepository.deleteUser(uuid);
};

export const addRoleToUser = async (userUuid: string, roleSlug: string): Promise<User> => {
  const user = await getUserByUuid(userUuid, true);
  const role = await roleService.getRoleBySlug(roleSlug);
  if (!user) {
    throw new Error(`User with Uuid ${userUuid} not found`);
  }
  if (!role) {
    throw new Error(`Role with Slug ${roleSlug} not found`);
  }

  if (!user.roles.some(r => r.id === role.id)) {
    user.roles.push(role);
  }

  return await userRepository.saveUser(user);
};
