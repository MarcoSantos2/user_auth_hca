import { Router } from 'express';
import * as companyController from '../controllers/companyController';
import { verifyToken, verifyPermissions, verifyAdmin } from '../middleware/authMiddleware';

const router = Router();

// Base route: /api/companies

// CRUD Routes
router.post('/', verifyToken, companyController.createCompany);
router.get('/', verifyToken, verifyPermissions, companyController.getCompanyByUuid);
router.patch('/', verifyToken, verifyPermissions, companyController.updateCompany);
router.delete('/', verifyToken, verifyPermissions, companyController.deleteCompany);

// Routes for Admin use only
router.get('/all', verifyToken, verifyAdmin, companyController.getAllCompanies);
// Route to get ALL COMPANIES - Internal use only
// TODO - Change Middleware that verify permissions to one specific for INTERNAL USE Validation
// router.get('/all', verifyToken, verifyPermissions, companyController.getAllCompanies);

export default router;

