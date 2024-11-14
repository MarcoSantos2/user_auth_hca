import { Permission } from '../models/Permission';
import * as permissionRepository from '../repositories/permissionRepository';
import { Role } from '../models/Role';
import { Company } from '../models/Company';

export const getAllPermissions = async (withRoles?: boolean): Promise<Permission[]> => { 
  return permissionRepository.findAllUsers(withRoles);
};

// Find User By UUID
export const getPermissionBySlug = async (slug: string, withRoles?: boolean) => {
  const permission = await permissionRepository.findPermissionBySlug(slug, withRoles);
  if (!permission) {
    throw new Error('Permission not found');
  }
  return permission;
};

// Find User By UUID
export const getPermissionsBySlugList = async (slugs: string[], withRoles?: boolean) => {
  const permissions = await permissionRepository.findPermissionsBySlugList(slugs, withRoles);
  if (!permissions) {
    throw new Error('Permissions not found');
  }
  return permissions;
};

// Find User By ID
export const getUserById = async (id: number) => {
  const permission = await permissionRepository.findPermissionById(id);
  if (!permission) {
    throw new Error('Permission not found');
  }
  return permission;
};

// Fetch permissions associated with the roles
export const findPermissionsByRolesAndCompany = async (roles: Role[], company: Company): Promise<Permission[]> => {
  return await permissionRepository.findPermissionsByRolesAndCompany(roles, company);
};
