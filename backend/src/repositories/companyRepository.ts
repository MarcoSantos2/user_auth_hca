import { AppDataSource } from "../datasource";
import { Company } from "../models/Company";

const companyRepository = AppDataSource.getRepository(Company);

export const createCompany = async (company: Partial<Company>): Promise<Company> => {
  const newCompany = companyRepository.create(company);
  return await companyRepository.save(newCompany);
};

export const findCompanyById = async (id: number): Promise<Company | null> => {
  return await companyRepository.findOneBy({ id });
};

export const save = async (company: Company): Promise<Company> => {
  return await companyRepository.save(company);
};

export const deleteCompany = async (id: number): Promise<void> => {
  await companyRepository.delete(id);
};

export const findAllCompanies = async (): Promise<Company[]> => {
    return await companyRepository.find();
};
