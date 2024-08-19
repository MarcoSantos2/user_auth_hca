import { AppDataSource } from "../datasource";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

export const findAllUsers = async (): Promise<User[]> => {
  return await userRepository.find();
};

export const saveUser = async (user: Partial<User>): Promise<User> => {
  const newUser = userRepository.create(user);
  return await userRepository.save(newUser);
};
