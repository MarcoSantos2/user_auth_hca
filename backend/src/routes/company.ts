import { Router } from 'express';
import * as companyController from '../controllers/companyController';
import { verifyToken, verifyPermissions } from '../middleware/authMiddleware';

const router = Router();

// Base route: /api/companies

// Route to create a new company
router.post('/', verifyToken, companyController.createCompany);

// Route to get ONE company by UUID
router.get('/:uuid', verifyToken, verifyPermissions, companyController.getCompanyByUuid);

// Route to update a company (you can implement the updateCompany function in the controller)
router.patch('/:uuid', verifyToken, verifyPermissions, companyController.updateCompany);

// Route to delete a company (you can implement the deleteCompany function in the controller)
router.delete('/:uuid', verifyToken, verifyPermissions, companyController.deleteCompany);

// Route to get ALL COMPANIES - Internal use only
// TODO - Change Middleware that verify permissions to one specific from INTERNAL USE Validation
router.get('/', verifyToken, verifyPermissions, companyController.getAllCompanies);

export default router;

