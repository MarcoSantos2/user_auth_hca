import { AppDataSource } from "../datasource";
import { Company } from "../models/Company";

const companyRepository = AppDataSource.getRepository(Company);

export const createCompany = async (company: Partial<Company>): Promise<Company> => {
  const newCompany = companyRepository.create(company);
  return await companyRepository.save(newCompany);
};

export const findCompanyByUuid = async (uuid: string, withUsers: boolean = false): Promise<Company | null> => {
  const query = companyRepository
    .createQueryBuilder('company')
    .where("company.uuid = :uuid", { uuid: uuid });

  if (withUsers) {
    query.leftJoinAndSelect("company.users", "user");
  }

  return await query.getOne();
};

export const save = async (company: Company): Promise<Company> => {
  return await companyRepository.save(company);
};

export const deleteCompany = async (uuid: string): Promise<void> => {
  await companyRepository.softDelete({uuid});
};

export const findAllCompanies = async (): Promise<Company[]> => {
    return await companyRepository.find();
};
