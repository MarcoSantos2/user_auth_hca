import { AppDataSource } from "../datasource";
import { Permission } from "../models/Permission";
import { Role } from "../models/Role";
import { Company } from "../models/Company";

const permissionRepository = AppDataSource.getRepository(Permission);

export const findAllUsers = async (withRoles: boolean = false): Promise<Permission[]> => {
  const query = permissionRepository
    .createQueryBuilder('permission');

  if (withRoles) {
    query.leftJoinAndSelect("permission.roles", "role");
  }

  return await query.getMany();
};

export const findPermissionById = async (id: number): Promise<Permission | null> => {
  return await permissionRepository.findOneBy({id});
};

export const findPermissionBySlug = async (slug: string, withRoles: boolean = false): Promise<Permission | null> => {
  const query = permissionRepository
    .createQueryBuilder('permission')
    .where("permission.slug = :slug", { slug: slug });

  if (withRoles) {
    query.leftJoinAndSelect("permission.roles", "role");
  }

  return await query.getOne();
};

export const findPermissionsBySlugList = async (slugs: string[], withRoles: boolean = false): Promise<Permission[]> => {
  const query = permissionRepository
    .createQueryBuilder('permission')
    .where("permission.slug IN (:...slugs)", { slugs: slugs });

  if (withRoles) {
    query.leftJoinAndSelect("permission.roles", "role");
  }

  return await query.getMany();
};

export const findPermissionsByRolesAndCompany = async (roles: Role[], company: Company): Promise<Permission[]> => {
  if (!roles || roles.length === 0) {
    return [];
  }

  const roleIds = roles.map(role => role.id); // Assuming each role has an 'id' property

  return await AppDataSource.getRepository(Permission)
    .createQueryBuilder('permission')
    .innerJoin('permission.roles', 'role') // Assuming there's a many-to-many relationship
    .where('role.id IN (:...roleIds)', { roleIds })
    .where('role.company_id = (:companyId)', { companyId: company.id })
    .getMany();
};
