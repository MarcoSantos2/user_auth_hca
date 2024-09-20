// Business logic implementation

import { User } from '../models/User'; // Import the shared User interface
import { hashPassword, comparePassword, generateToken } from '../middleware/googleAuth';
import * as userRepository from '../repositories/userRepository';
import * as roleService from '../services/roleService';
import { v4 as uuidv4 } from 'uuid';
import * as googlePayloadRepository from '../repositories/googlePayload';
import { DirectLoginPayload, ExternalLoginPayload, UserData } from '../types';

function randomPassword(length: number = 12): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export const signup = async (userData: UserData): Promise<string | null> => {
  const { email, name, password, googleId, picture } = userData;

  // Check if the user already exists
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  let newUser;
  if (googleId) {
    // Google Sign-Up
    newUser = await userRepository.createUser({
      email,
      name,
      googleId,
      password: undefined, // Password is not needed for Google users
      verify: true,
    });
  } else {
    // Direct Sign-Up
    if (!password) {
      throw new Error('Password is required for direct sign-up');
    }
    newUser = await userRepository.createUser({
      email,
      name,
      password: hashPassword(password),
      verify: false,
    });
  }

  if (newUser) {
    return generateToken({ uuid: newUser.uuid, email: newUser.email });
  }
  return null;
};

/*
Using a type guard function - type-safe and scalable solution. It provides clarity to 
TypeScript about the types and ensures that you're handling each payload type appropriately.
*/
function isExternalLoginPayload(payload: DirectLoginPayload | ExternalLoginPayload): payload is ExternalLoginPayload {
  return 'googleId' in payload;
}

export const signIn = async (payload: DirectLoginPayload | ExternalLoginPayload): Promise<string | null> => {
  if (isExternalLoginPayload(payload)) {
    // Google Sign-In
    const { email, googleId } = payload;
    const dbUser = await userRepository.findUserByEmail(email);

    if (dbUser && dbUser.googleId === googleId) {
      return generateToken({ uuid: dbUser.uuid, email: dbUser.email });
    }
    throw new Error('Google user not found');
  } else {
    // Direct Sign-In
    const { email, password } = payload;
    const dbUser = await userRepository.findUserByEmail(email);

    if (dbUser && dbUser.password && comparePassword(password, dbUser.password)) {
      return generateToken({ uuid: dbUser.uuid, email: dbUser.email });
    }
    throw new Error('Invalid credentials');
  }
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
