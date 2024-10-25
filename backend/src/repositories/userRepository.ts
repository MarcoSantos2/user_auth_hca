import { AppDataSource } from "../datasource";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

export const findUserByEmail = async (email: string, withGoogle: boolean = false): Promise<User | null> => {
  const query = userRepository
  .createQueryBuilder('user')
  .where("user.email = :email", { email: email });

  if (withGoogle) {
    query.leftJoinAndSelect("user.google_accounts", "google_accounts");
  }

  return await query.getOne();
};

export const findAllUsers = async (withRoles: boolean = false): Promise<User[]> => {
  const query = userRepository
    .createQueryBuilder('user');

  if (withRoles) {
    query.leftJoinAndSelect("user.roles", "role");
  }

  return await query.getMany();
};

export const findUserById = async (id: number): Promise<User | null> => {
  return await userRepository.findOneBy({id});
};

export const findUserByUuid = async (uuid: string, withRoles: boolean = false, withCompanies: boolean = false): Promise<User | null> => {
  const query = userRepository
    .createQueryBuilder('user')
    .where("user.uuid = :uuid", { uuid: uuid });

  if (withRoles) {
    query.leftJoinAndSelect("user.roles", "role");
  }
  if (withCompanies) {
    query.leftJoinAndSelect("user.companies", "company");
  }

  return await query.getOne();
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const newUser = userRepository.create(user);
  return await userRepository.save(newUser);
};

export const saveUser = async (user: User): Promise<User> => {
  return await userRepository.save(user);
};

export const deleteUser = async (uuid: string): Promise<void> => {
  await userRepository.softDelete({ uuid });
};
