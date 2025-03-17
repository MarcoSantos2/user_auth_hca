import { Request, Response } from 'express';
import * as companyService from '../services/companyService';
import * as userService from '../services/userService';

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const user = req.body.user;

  // TODO - Find a VALIDATOR function or library to validate request body

  // Validate name and description
  if (typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ message: 'Invalid name: must be a non-empty string.' });
    return;
  }

  if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
    res.status(400).json({ message: 'Invalid description: must be a string or omitted.' });
    return;
  }

  try {
    const company = await companyService.createCompany({ name, description }, user);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getCompanyByUuid = async (req: Request, res: Response): Promise<void> => {
  try {
      const isUserInCompany = await companyService.isUserInCompany(req.body.company.uuid, req.body.user);
      if(!isUserInCompany) {
        res.status(403).json({ message: 'User is not in company' });
        return;
      }

      const companyUuid = req.body.company.uuid;
      const company = await companyService.getCompanyByUuid(companyUuid);
      res.status(200).json(company);
  } catch (error) {
      res.status(500).json({ message: (error as Error).message });
  }
};

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const isUserInCompany = await companyService.isUserInCompany(req.body.company.uuid, req.body.user);
    if(!isUserInCompany) {
      res.status(403).json({ message: 'User is not in company' });
      return;
    }

    const companyUuid = req.body.company.uuid;
    const { name, description } = req.body;

    const updatedCompany = await companyService.updateCompany(companyUuid, { name, description });
    res.status(200).json(updatedCompany);
  } catch (error) {
      res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const isUserInCompany = await companyService.isUserInCompany(req.body.company.uuid, req.body.user);
    if(!isUserInCompany) {
      res.status(403).json({ message: 'User is not in company' });
      return;
    }

    const companyUuid = req.body.company.uuid;
    await companyService.deleteCompany(companyUuid);
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: (error as Error).message });
  }
};

// get ALL COMPANIES - Internal use only
export const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
    try {
        const companies = await companyService.getAllCompanies();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const inviteUserToCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, user: staffUser, company } = req.body;

    const userInvited = await userService.getUserByEmail(email);
    if (userInvited) {
      const existingMembership = await companyService.isUserInCompany(company.uuid, userInvited);
      if (existingMembership) {
        throw new Error('User is already a member of the company');
    }
  }

    if (!name || !email || !company) {
      res.status(400).json({ message: 'Name, email, and company are required' });
      return;
    }

    await companyService.inviteUserToCompany(name, email, company, staffUser);

    res.status(200).json({ message: 'Invitation sent successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const acceptCompanyInvite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { invite_token: inviteToken, user } = req.body;
    if (!inviteToken) {
      res.status(400).json({ message: 'Invite token is required' });
      return;
    }

    await companyService.acceptCompanyInvite(inviteToken as string, user);

    res.status(200).json({ message: 'Successfully joined the company' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getCompanyInvitations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { company } = req.body;   
    const invitations = await companyService.getCompanyInvitations(company.uuid);
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
