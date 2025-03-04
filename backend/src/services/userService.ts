// Business logic implementation
import crypto from 'crypto';
import { User } from '../models/User'; // Import the shared User interface
import { hashPassword, comparePassword } from '../utils/passwordHelper';
import { generateToken } from '../utils/tokenHelper';
import * as userRepository from '../repositories/userRepository';
import * as googleRepository from '../repositories/googleAccountRepository';
import * as roleService from './roleService';
import { DirectLoginPayload, ExternalLoginPayload, UserData } from '../types';
import { GoogleAccount } from '../models/GoogleAccount';
import { Company } from '../models/Company';
import { sendEmail } from '../utils/email/sendEmail';

export const signup = async (userData: UserData): Promise<string | null> => {
  const { email, name, password, googleId } = userData;

  // Check if the user already exists
  let existingUser: User|null;
  if (googleId) {
    const existingGoogle = await googleRepository.findGoogleAccountByEmail(email);
    existingUser = existingGoogle ? existingGoogle.user : null;
  } else {
    existingUser = await userRepository.findUserByEmail(email);
  }

  if (existingUser) {
    throw new Error('User already exists');
  }

  let newUser: User;
  if (googleId) {
    // Google Sign-Up
    newUser = await userRepository.createUser({
      email,
      name,
      password: hashPassword(crypto.randomBytes(32).toString('hex')),
      verify: true,
    });

    const googleAccount = new GoogleAccount();
    googleAccount.email = email;
    googleAccount.google_id = googleId;
    googleAccount.user = newUser;
    await googleRepository.createGoogleAccount(googleAccount);
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

    const existingGoogle = await googleRepository.findGoogleAccountByEmail(email);
    const dbUser = existingGoogle ? existingGoogle.user : null;
    const isValidGoogleAccount = existingGoogle?.google_id === googleId;

    if (dbUser && isValidGoogleAccount) {
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

// Get All Users of All Companies - Internal use only
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

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await userRepository.findUserByEmail(email);
};

export const getUserByUuid = async (uuid: string, withRoles?: boolean, withCompanies?: boolean) => {
  const user = await userRepository.findUserByUuid(uuid, withRoles, withCompanies);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const getUserById = async (id: number) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// This function will SOFT DELETE the user from the DB
export const deleteUser = async (uuid: string): Promise<void> => {
  const user = await userRepository.findUserByUuid(uuid);
  if (!user) {
    throw new Error('User not found');
  }
  await userRepository.deleteUser(uuid);
};

export const addRoleToUser = async (userUuid: string, roleSlug: string): Promise<User> => {
  await roleService.addUserToRole(userUuid, roleSlug);
  return await getUserByUuid(userUuid, true);
};

export const getUserCompanies = async (userUuid: string): Promise<Company[]> => {
  const user = await getUserByUuid(userUuid, false, true);
  return user.companies;
};

export const requestPasswordReset = async (email: string): Promise<void> => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const passkey = crypto.randomBytes(3).toString('hex');
    const expirationMinutes = parseInt(process.env.RESET_PASSKEY_EXPIRATION_MINUTES || '20', 10); // default 20 minutes if not set
    const expires = new Date(Date.now() + expirationMinutes * 60 * 1000);

    user.reset_passkey = passkey;
    user.reset_passkey_exp = expires;
    await userRepository.saveUser(user);

    await sendEmail(user.email, 'Password Reset', 'resetPassword', {
        name: user.name || 'User',
        passkey: passkey,
        action_url: `${process.env.APP_URL}/reset-password?passkey=${passkey}`,
        operating_system: 'Unknown OS', // TODO: Replace with actual data if available, need to obtain from user
        browser_name: 'Unknown Browser', // TODO: Replace with actual data if available, need to obtain from user
        support_url: `${process.env.APP_URL}/support`,
    });
};

export const verifyPasskey = async (email: string, passkey: string): Promise<string | null> => {
  const user = await userRepository.findUserByEmail(email);
  if (!user || user.reset_passkey !== passkey) {
    return null;
  }

  const now = new Date();
  if (user.reset_passkey_exp && user.reset_passkey_exp < now) {
    return null;
  }

  const token = generateToken({ uuid: user.uuid, email: user.email });

  await userRepository.saveUser(user);

  return token;
};

export const changePassword = async (user: User, newPassword: string): Promise<void> => {
  
  if (comparePassword(newPassword, user.password!)) {
    throw new Error('New password cannot be the same as the old password');
  }

  user.password = hashPassword(newPassword);
  user.reset_passkey = null;
  user.reset_passkey_exp = null;
  await userRepository.saveUser(user);

  await sendEmail(user.email, 'Password Changed', 'passwordChanged', {
    name: user.name || 'User',
    product_name: process.env.PRODUCT_NAME,
  }); 
};
