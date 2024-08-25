import { AppDataSource } from "../datasource";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

export const findAllUsers = async (): Promise<User[]> => {
  return await userRepository.find();
};

export const findUserById = async (id: string): Promise<User | null> => {
  return await userRepository.findOne({ where: { id: Number(id) } });
};

export const saveUser = async (user: Partial<User>): Promise<User> => {
  const newUser = userRepository.create(user);
  return await userRepository.save(newUser);
};

export const deleteUser = async (id: string): Promise<void> => {
  await userRepository.softDelete({ id: Number(id) });
};