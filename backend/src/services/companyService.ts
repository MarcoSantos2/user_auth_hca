// Business logic implementation

import * as companyRepository from '../repositories/companyRepository';
import * as roleService from '../services/roleService';
import { Company } from '../models/Company';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { findUserByUuid } from '../repositories/userRepository';

export const createCompany = async (companyData: { name: string; description?: string }, user: User): Promise<Company> => {
    // Create the company
    const company = await companyRepository.createCompany(companyData);
    await addUserToCompany(company.uuid, user.uuid);

    // Create the "Admin" role
    const uniqueCompanySlugID = company.id * 42;
    const adminSlug = `admin_${uniqueCompanySlugID}`; 
    // Why 42, do you ask? Because it is the answer to the ultimate question of life, the Universe, and everything.
    // Still confused? I recommend you read The Hitchhiker's Guide to Galaxy. 

    const adminRole = await roleService.createRole({
        name: "Admin",
        description: "Admin role for company management",
        slug: adminSlug,
        company
    });
    // Assign the "Admin" role to the user
    await roleService.addUserToRole(user.uuid, adminRole.slug || "");
    
    // Add all permissions to the "Admin" role
    await roleService.addAllPermissionsToRole(adminRole?.slug || "");

    // TODO: Create the other default roles for the companies (eg HR, HCA etc)

    return company;
};

export const getCompanyByUuid = async (uuid: string): Promise<Company | null> => {
    const company = await companyRepository.findCompanyByUuid(uuid);
    if (!company) {
        throw new Error(`Company with UUID ${uuid} not found`);
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

export const updateCompany = async (uuid: string, updates: { name?: string; description?: string }): Promise<Company> => {
  const company = await companyRepository.findCompanyByUuid(uuid);
  if (!company) {
      throw new Error(`Company with UUID ${uuid} not found`);
  }
  company.name = updates.name || company.name;
  company.description = updates.description || company.description;

  return await companyRepository.save(company);
};

export const deleteCompany = async (uuid: string): Promise<void> => {
  const company = await companyRepository.findCompanyByUuid(uuid);
  if (!company) {
      throw new Error(`Company with UUID ${uuid} not found`);
  }

  await companyRepository.deleteCompany(uuid);
};

export const getAllUsersInCompany = async (uuid: string): Promise<User[]> => {
  const company = await companyRepository.findCompanyByUuid(uuid, true);
  if (!company) {
      throw new Error(`Company with UUID ${uuid} not found`);
  }
  return company.users;
};

export const getAllRolesInCompany = async (uuid: string): Promise<Role[]> => {
  const company = await companyRepository.findCompanyByUuid(uuid, false, true);
  if (!company) {
      throw new Error(`Company with UUID ${uuid} not found`);
  }
  return company.roles;
}

export const addUserToCompany = async (companyUuid: string, userUuid: string): Promise<Company> => {
  const company = await companyRepository.findCompanyByUuid(companyUuid, true);
  if (!company) {
      throw new Error(`Company with UUID ${companyUuid} not found`);
  }
  const user = await findUserByUuid(userUuid);
  if (!user) {
      throw new Error(`User with UUID ${userUuid} not found`);
  }

  if (!company.users.some(u => u.id === user.id)) {
    company.users.push(user);
  }
  return await companyRepository.save(company);
};

export const isUserInCompany = async (companyUuid: string, user: User): Promise<boolean> => {
  const company = await companyRepository.findCompanyByUuid(companyUuid, true);
  if (!company) {
      throw new Error(`Company with UUID ${companyUuid} not found`);
  }
  return company.users.some(u => u.id === user.id);
}