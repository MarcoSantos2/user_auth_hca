import * as companyRepository from '../repositories/companyRepository';
import { Company } from '../models/Company';

export const createCompany = async (companyData: { name: string; description?: string }): Promise<Company> => {
  return await companyRepository.createCompany(companyData);
};

export const getCompanyById = async (id: number): Promise<Company | null> => {
    const company = await companyRepository.findCompanyById(id);
    if (!company) {
        throw new Error(`Company with ID ${id} not found`);
    }
    return company;
};
// 1) While creating a company, automatically create 1 role for that company with ALL the permission (inside the createCompany function). Add role to the user making the call

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


/* ADD OTHER FUNCTIONALITY HERE...

3) Get company

5) Get list of all companies - user getting all the companies he works for

6) get list of ALL companies

*/
