import { Request, Response } from 'express';
import * as companyService from '../services/companyService';

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const user = req.body.user;

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

export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
      const companyId = parseInt(req.params.id);
      const company = await companyService.getCompanyById(companyId);
      res.status(200).json(company);
  } catch (error) {
      res.status(500).json({ message: (error as Error).message });
  }
};

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
  const companyId = parseInt(req.params.id);
  const { name, description } = req.body;

  try {
      const updatedCompany = await companyService.updateCompany(companyId, { name, description });
      res.status(200).json(updatedCompany);
  } catch (error) {
      res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  const companyId = parseInt(req.params.id);

  try {
      await companyService.deleteCompany(companyId);
      res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
    try {
        const companies = await companyService.getAllCompanies();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
