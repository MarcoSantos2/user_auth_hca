import { AppDataSource } from "../datasource";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await userRepository.findOne({ where: { email } });
};

export const findAllUsers = async (): Promise<User[]> => {
  return await userRepository.find();
};

export const findUserById = async (id: number): Promise<User | null> => {
  return await userRepository.findOneBy({id});
};

export const findUserByUuid = async (uuid: string): Promise<User | null> => {
  return await userRepository.createQueryBuilder('user')
  .where("user.uuid = :uuid", { uuid: uuid })
  .getOne()
};

export const saveUser = async (user: Partial<User>): Promise<User> => {
  const newUser = userRepository.create(user);
  return await userRepository.save(newUser);
};

export const deleteUser = async (uuid: string): Promise<void> => {
  await userRepository.softDelete({ uuid });
};