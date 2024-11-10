import { Router } from 'express';
import * as companyController from '../controllers/companyController';
import { verifyToken, verifyPermissions } from '../middleware/authMiddleware';

const router = Router();

// Base route: /api/companies

// CRUD Routes
router.post('/', verifyToken, companyController.createCompany);
router.get('/', verifyToken, verifyPermissions, companyController.getCompanyByUuid);
router.patch('/', verifyToken, verifyPermissions, companyController.updateCompany);
router.delete('/', verifyToken, verifyPermissions, companyController.deleteCompany);

export default router;

