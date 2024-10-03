// Business logic implementation
import { Role } from "../models/Role";
import * as userService from './userService';
import * as permissionService from './permissionService';
import * as roleRepository from "../repositories/roleRepository";
import { permission } from "process";

export const createRole = async ({ name, description, slug }: { name: string; description: string; slug: string }): Promise<Partial<Role>> => {
  return await roleRepository.createRole({ name, description, slug });
};

export const updateRole = async (slug: string, { name, description, slug: newslug }: { name: string; description: string; slug: string }): Promise<Partial<Role>> => {
  const role = await getRoleBySlug(slug, true);
  if (!role) {
    throw new Error(`Role with Slug ${slug} not found`);
  }
  role.name = name;
  role.description = description;
  role.slug = newslug;
  return await roleRepository.saveRole(role);
};

export const getAllRoles = async (): Promise<Role[]> => {
  return await roleRepository.findAllRoles();
};

export const deleteRole = async (slug: string): Promise<void> => {
  await roleRepository.deleteRole(slug);
};

export const getRoleBySlug = async (slug: string, withUsers?: boolean, withPermissions?: boolean ): Promise<Role | null> => {
  return await roleRepository.findRoleBySlug(slug, withUsers, withPermissions);
};

export const addUserToRole = async (userUuid: string, roleSlug: string): Promise<Role> => {
  const user = await userService.getUserByUuid(userUuid);
  const role = await getRoleBySlug(roleSlug, true);
  if (!user) {
    throw new Error(`User with Uuid ${userUuid} not found`);
  }
  if (!role) {
    throw new Error(`Role with Slug ${roleSlug} not found`);
  }

  if (!role.users.some(u => u.id === user.id)) {
    role.users.push(user);
  }

  return await roleRepository.saveRole(role);
};

export const addPermissionToRole = async (permission_slug: string, roleSlug: string): Promise<Role> => {
  const permission = await permissionService.getPermissionBySlug(permission_slug);
  const role = await getRoleBySlug(roleSlug, false, true);
  if (!permission) {
    throw new Error(`Permission with Slug ${permission_slug} not found`);
  }
  if (!role) {
    throw new Error(`Role with Slug ${roleSlug} not found`);
  }

  if (!role.permissions.some(p => p.id === permission.id)) {
    role.permissions.push(permission);
  }

  return await roleRepository.saveRole(role);
};

export const addPermissionsToRole = async (permission_list: string[], roleSlug: string): Promise<Role> => {
  const permissions = await permissionService.getPermissionsBySlugList(permission_list);
  const role = await getRoleBySlug(roleSlug, false, true);
  if (!role) {
    throw new Error(`Role with Slug ${roleSlug} not found`);
  }

  for (const permission of permissions) {
    if (!role.permissions.some(p => p.id === permission.id)) {
      role.permissions.push(permission);
    }
  }

  return await roleRepository.saveRole(role);
};
