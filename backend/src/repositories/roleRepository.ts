import { AppDataSource } from "../datasource";
import { Role } from "../models/Role";

const roleRepository = AppDataSource.getRepository(Role);

export const findRoleByName = async (name: string): Promise<Role | null> => {
  return await roleRepository.findOne({ where: { name } });
};

export const findRoleById = async (id: number): Promise<Role | null> => {
    return await roleRepository.findOneBy({id});
  };

export const findAllRoles = async (): Promise<Role[]> => {
  return await roleRepository.find();
};

export const saveRole = async (role: Partial<Role>): Promise<Role> => {
  const newRole = roleRepository.create(role);
  return await roleRepository.save(newRole);
};

export const deleteRole = async (id: number): Promise<void> => {
  await roleRepository.delete(id);
};

export const findRoleBySlug = async (slug: string): Promise<Role | null> => {
  return await roleRepository.findOne({ where: { slug } });
};