import { AppDataSource } from "../datasource";
import { UserCompanyRole } from "../models/UserCompanyRole";

const userCompanyRoleRepository = AppDataSource.getRepository(UserCompanyRole);

export const createUserCompanyRole = async (userCompanyRole: Partial<UserCompanyRole>): Promise<UserCompanyRole> => {
  const newUserCompanyRole = userCompanyRoleRepository.create(userCompanyRole);
  return await userCompanyRoleRepository.save(newUserCompanyRole);
};