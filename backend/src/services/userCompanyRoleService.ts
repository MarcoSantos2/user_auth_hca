import * as userCompanyRoleRepository from '../repositories/userCompanyRoleRepository';
import { UserCompanyRole } from '../models/UserCompanyRole';
import { User } from '../models/User'; // Import User
import { Company } from '../models/Company'; // Import Company
import { Role } from '../models/Role'; // Import Role

export const assignRoleToUserInCompany = async (userId: number, companyId: number, roleId: number): Promise<UserCompanyRole> => {
  const userCompanyRole = new UserCompanyRole();
  userCompanyRole.user = { id: userId } as User; // Assuming you have the user object
  userCompanyRole.company = { id: companyId } as Company; // Assuming you have the company object
  userCompanyRole.role = { id: roleId } as Role; // Assuming you have the role object

  return await userCompanyRoleRepository.createUserCompanyRole(userCompanyRole);
};
