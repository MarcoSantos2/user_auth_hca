import { Request, Response } from 'express';
import * as companyService from '../services/companyService';

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const company = await companyService.createCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// ADD OTHER FUNCTIONALITY HERE...