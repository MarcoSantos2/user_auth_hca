// Business logic implementation

import * as companyRepository from '../repositories/companyRepository';
import * as roleService from '../services/roleService';
import { Company } from '../models/Company';
import { User } from '../models/User';

export const createCompany = async (companyData: { name: string; description?: string }, user: User): Promise<Company> => {
    // Create the company
    const company = await companyRepository.createCompany(companyData);

    // Create the "Admin" role
    const adminSlug = `admin_${company.id * 42}`; //use ID instead of UUID so this will be a readable number
    // Why 42, do you ask? Because it is the answer to the ultimate question of life, the Universe, and everything.
    // Still confused? I recommend you read The Hitchhiker's Guide to Galaxy. 

    const adminRole = await roleService.createRole({
        name: "Admin",
        description: "Admin role for company management",
        slug: adminSlug,
        company
    });

    // TODO: Create the other default roles for the companies (eg HR, HCA etc)

    // Add all permissions to the "Master" role
    await roleService.addAllPermissionsToRole(adminRole?.slug || "");
       
    // Assign the "Master" role to the user
    await roleService.addUserToRole(user.uuid, adminRole.slug || "");

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
  Object.assign(company, updates);
  return await companyRepository.save(company);
};

export const deleteCompany = async (uuid: string): Promise<void> => {
  const company = await companyRepository.findCompanyByUuid(uuid);
  if (!company) {
      throw new Error(`Company with UUID ${uuid} not found`);
  }
  await companyRepository.deleteCompany(uuid);
};

