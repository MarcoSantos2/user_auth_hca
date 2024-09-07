// Business logic implementation

import { Role } from "../models/Role";
import * as roleRepository from "../repositories/roleRepository";


// TODO ADD ALL FUNCTIONALITY FROM USERROLESERVICE TO ROLESERVICE.TS
export const createRole = async ({ name, description, slug }: { name: string; description?: string; slug: string }): Promise<Partial<Role>> => {
  const role = await roleRepository.saveRole({ name, description, slug });
  return { slug: role.slug, description: role.description };
};

export const getAllRoles = async (): Promise<Role[]> => {
  return await roleRepository.findAllRoles();
};

export const deleteRole = async (id: number): Promise<void> => {
  await roleRepository.deleteRole(id);
};

export const getRoleBySlug = async (slug: string): Promise<Role | null> => {
  return await roleRepository.findRoleBySlug(slug);
};