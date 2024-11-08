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
  return await roleRepository.createQueryBuilder('role')
  .leftJoinAndSelect("role.users", "user")
  .getMany();
};

export const createRole = async (role: Partial<Role>): Promise<Role> => {
  const newRole = roleRepository.create(role);
  return await roleRepository.save(newRole);
};

export const saveRole = async (role: Role): Promise<Role> => {
  return await roleRepository.save(role);
};

export const deleteRole = async (slug: string): Promise<void> => {
  await roleRepository.softDelete({ slug });
};

export const findRoleBySlug = async (slug: string, withUsers: boolean = false, withPermissions: boolean = false, withCompany: boolean = false): Promise<Role | null> => {
  const query = roleRepository
    .createQueryBuilder('role')
    .where("role.slug = :slug", { slug: slug });

  if (withUsers) {
    query.leftJoinAndSelect("role.users", "user");
  }

  if (withPermissions) {
    query.leftJoinAndSelect("role.permissions", "permission");
  }
  if (withCompany) {
    query.leftJoinAndSelect("role.company", "company");
  }

  return await query.getOne();
};

export const findRolesByCompanyId = async (companyId: number): Promise<Role[]> => {
  return await roleRepository.find({ where: { company: { id: companyId } } });
};