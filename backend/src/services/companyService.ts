import * as companyRepository from '../repositories/companyRepository';
import { Company } from '../models/Company';

export const createCompany = async (companyData: { name: string; description?: string }): Promise<Company> => {
  return await companyRepository.createCompany(companyData);
};
