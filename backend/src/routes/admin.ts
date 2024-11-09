import { Router } from 'express';
import { verifyToken, verifyPermissions } from '../middleware/authMiddleware';
// other imports

const router = Router();

// Base route: /api/admin
// router.get('/all', verifyToken, verifyPermissions, companyController.getAllCompanies);

// example: router.post('/', verifyToken, companyController.createCompany);

// TODO - Change Middleware that verify permissions to one specific from INTERNAL USE Validation


export default router;