import { AppDataSource } from "../datasource";
import { Company } from "../models/Company";

const companyRepository = AppDataSource.getRepository(Company);

export const createCompany = async (company: Partial<Company>): Promise<Company> => {
  const newCompany = companyRepository.create(company);
  return await companyRepository.save(newCompany);
};