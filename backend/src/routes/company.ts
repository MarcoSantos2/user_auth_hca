import { Router } from 'express';
import * as companyController from '../controllers/companyController';
import { verifyToken, verifyPermissions } from '../middleware/authMiddleware';

const router = Router();

// Base route: /api/companies

// Route to create a new company
router.post('/', verifyToken, verifyPermissions, companyController.createCompany);

// Route to get a company by ID
router.get('/:id', verifyToken, verifyPermissions, companyController.getCompanyById);

// Route to update a company (you can implement the updateCompany function in the controller)
router.patch('/:id', verifyToken, verifyPermissions, companyController.updateCompany);

// Route to delete a company (you can implement the deleteCompany function in the controller)
router.delete('/:id', verifyToken, verifyPermissions, companyController.deleteCompany);

export default router;

