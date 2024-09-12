// Business logic implementation
import { Role } from "../models/Role";
import * as userService from './userService';
import * as roleRepository from "../repositories/roleRepository";

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

export const getRoleBySlug = async (slug: string, withUsers?: boolean): Promise<Role | null> => {
  return await roleRepository.findRoleBySlug(slug, withUsers);
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

const user = {
  "id": 3,
  "name": "Human Resources",
  "description": "Fires everyone for no reason.",
  "slug": "hr_1",
  "created_at": "2024-09-12T01:39:23.891Z",
  "updated_at": "2024-09-12T01:39:23.891Z",
  "deleted_at": null
};

let roles = [
  {
      "id": 3,
      "name": "Human Resources",
      "description": "Fires everyone for no reason.",
      "slug": "hr_1",
      "created_at": "2024-09-12T01:39:23.891Z",
      "updated_at": "2024-09-12T01:39:23.891Z",
      "deleted_at": null
  }
]

roles.push(user);

roles = [
  {
      "id": 3,
      "name": "Human Resources",
      "description": "Fires everyone for no reason.",
      "slug": "hr_1",
      "created_at": "2024-09-12T01:39:23.891Z",
      "updated_at": "2024-09-12T01:39:23.891Z",
      "deleted_at": null
  },
  {
    "id": 3,
    "name": "Human Resources",
    "description": "Fires everyone for no reason.",
    "slug": "hr_1",
    "created_at": "2024-09-12T01:39:23.891Z",
    "updated_at": "2024-09-12T01:39:23.891Z",
    "deleted_at": null
  }
]