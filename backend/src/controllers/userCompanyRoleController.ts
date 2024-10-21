import { Request, Response } from 'express';
import * as userCompanyRoleService from '../services/userCompanyRoleService';

export const assignRoleToUserInCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, companyId, roleId } = req.body;
    const userCompanyRole = await userCompanyRoleService.assignRoleToUserInCompany(userId, companyId, roleId);
    res.status(201).json(userCompanyRole);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// ADD OTHER FUNCTIONALITY HERE...