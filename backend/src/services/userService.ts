// Business logic implementation

import { User } from '../models/User'; // Import the shared User interface
import { hashPassword, comparePassword, generateToken } from '../middleware/auth';
import * as userRepository from '../repositories/userRepository';
import { UserRole } from "../models/UserRole";
import * as userRoleRepository from "../repositories/userRoleRepository";
import * as roleRepository from '../repositories/roleRepository';


export const signup = async ({ email, name, sub }: { email: string; name: string; sub: string }): Promise<string | null> => {
  // Check if the user already exists in the repository
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create and save the new user using TypeORM
  const newUser = await userRepository.saveUser({
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
export const getAllUsers = async (): Promise<User[]> => { 
  return userRepository.findAllUsers();
};

export const createUser = async ({ name, email, password }: { name: string; email: string; password: string }): Promise<User> => {
  const hashedPassword = hashPassword(password);
  const user = await userRepository.saveUser({ name, email, password: hashedPassword });
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
export const getUserByUuid = async (uuid: string) => {
  const user = await userRepository.findUserByUuid(uuid);
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

// The next 3 funtions will handle functionality in the User_Role table.

export const assignRoleToUser = async (userId: number, roleId: number): Promise<UserRole> => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const role = await roleRepository.findRoleById(roleId);
  if (!role) {
    throw new Error(`Role with ID ${roleId} not found`);
  }

  return await userRoleRepository.saveUserRole({ user, role });
};

export const getUserRoles = async (userId: number): Promise<UserRole[]> => {
  const user = await userRoleRepository.findUserById(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }
  return await userRoleRepository.findUserRolesByUserId(userId);
};

export const removeUserRole = async (userId: number, roleId: number): Promise<void> => {
  const userRoles = await userRoleRepository.findUserRolesByUserId(userId);
  const userRole = userRoles.find(ur => ur.role.id === roleId);
  if (!userRole) {  
    throw new Error(`UserRole with User ID ${userId} and Role ID ${roleId} not found`);
  }
  await userRoleRepository.deleteUserRole(userRole.id);
};