// Business logic implementation

import * as companyRepository from '../repositories/companyRepository';
import * as roleService from '../services/roleService';
import * as permissionService from '../services/permissionService';
import { Company } from '../models/Company';
import { User } from '../models/User';

export const createCompany = async (companyData: { name: string; description?: string }, user: User): Promise<Company> => {
    // Create the company
    const company = await companyRepository.createCompany(companyData);

    // Create the "Master" role
    const masterRole = await roleService.createRole({
        name: "Master",
        description: "Master role for company management",
        slug: "master"
    });

    // Fetch all permissions
    const allPermissions = await permissionService.getAllPermissions();

    // Add all permissions to the "Master" role
    for (const permission of allPermissions) {
        await roleService.addPermissionToRole(permission.slug, masterRole.slug!);
    }

    // Assign the "Master" role to the user
    await roleService.addUserToRole(user.uuid, masterRole.slug!);

    return company;
};

export const getCompanyById = async (id: number): Promise<Company | null> => {
    const company = await companyRepository.findCompanyById(id);
    if (!company) {
        throw new Error(`Company with ID ${id} not found`);
    }
    return company;
};

export const getAllCompanies = async (): Promise<Company[] | string> => {
  const companies = await companyRepository.findAllCompanies();
  if (companies.length == 0) {
    return "There isn't any company to be displayed"
  }
  return companies;
};

export const updateCompany = async (id: number, updates: { name?: string; description?: string }): Promise<Company> => {
  const company = await companyRepository.findCompanyById(id);
  if (!company) {
      throw new Error(`Company with ID ${id} not found`);
  }
  Object.assign(company, updates);
  return await companyRepository.save(company);
};

export const deleteCompany = async (id: number): Promise<void> => {
  const company = await companyRepository.findCompanyById(id);
  if (!company) {
      throw new Error(`Company with ID ${id} not found`);
  }
  await companyRepository.deleteCompany(id);
};

