import { AppDataSource } from "../datasource";
import { UserRole } from "../models/UserRole";

const userRoleRepository = AppDataSource.getRepository(UserRole);

export const findUserRolesByUserId = async (userId: number): Promise<UserRole[]> => {
  return await userRoleRepository.find({ where: { user: { id: userId } }, relations: ["role"] });
};

export const findUserById = async (id: number): Promise<UserRole | null> => {
    return await userRoleRepository.findOneBy({id});
  };

  
export const saveUserRole = async (userRole: Partial<UserRole>): Promise<UserRole> => {
  const newUserRole = userRoleRepository.create(userRole);
  return await userRoleRepository.save(newUserRole);
};

export const deleteUserRole = async (id: number): Promise<void> => {
  await userRoleRepository.delete(id);
};

export const findUserRoleById = async (id: number): Promise<UserRole | null> => {
    return await userRoleRepository.findOneBy({ id });
  };