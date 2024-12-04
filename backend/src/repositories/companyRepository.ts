import { AppDataSource } from "../datasource";
import { Company } from "../models/Company";

const companyRepository = AppDataSource.getRepository(Company);

export const createCompany = async (company: Partial<Company>): Promise<Company> => {
  const newCompany = companyRepository.create(company);
  return await companyRepository.save(newCompany);
};

export const findCompanyByUuid = async (uuid: string, withUsers: boolean = false, withRoles: boolean = false): Promise<Company | null> => {
  const query = companyRepository
    .createQueryBuilder('company')
    .where("company.uuid = :uuid", { uuid: uuid });

  if (withUsers) {
    query.leftJoinAndSelect("company.users", "user");
  }

  if (withRoles) {
    query.leftJoinAndSelect("company.roles", "role");
  }

  return await query.getOne();
};

export const save = async (company: Company): Promise<Company> => {
  return await companyRepository.save(company);
};

export const deleteCompany = async (uuid: string): Promise<void> => {
  const company = await companyRepository.findOne({ where: { uuid }, relations: ["roles"] }); // Finding the roles is crucial for cascading operations

  if (company) {
    await companyRepository.softRemove(company);
  }
};

export const findAllCompanies = async (): Promise<Company[]> => {
    return await companyRepository.find();
};
