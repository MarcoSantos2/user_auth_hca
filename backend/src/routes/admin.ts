import { Router } from 'express';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware';
import * as companyController from '../controllers/companyController';
import * as userController from '../controllers/userController';
import * as roleController from '../controllers/roleController';

const router = Router();

// Base route: /api/admin

// Internal Admin Routes - CRUD
router.get('/companies', verifyToken, verifyAdmin, companyController.getAllCompanies);
router.get('/users', verifyToken, verifyAdmin, userController.getUsers);
router.get('/roles', verifyToken, verifyAdmin, roleController.getRoles);

export default router;