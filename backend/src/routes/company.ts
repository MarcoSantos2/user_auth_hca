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

// Invite user to join company
router.post('/invite', verifyToken, verifyPermissions, companyController.inviteUserToCompany);
router.get('/accept-invite', verifyToken, companyController.acceptCompanyInvite);
router.get('/invitations', verifyToken, verifyPermissions, companyController.getCompanyInvitations);
router.delete('/invitation', verifyToken, verifyPermissions, companyController.cancelInvitation);

// TODO - Change Middleware that verify permissions to one specific for INTERNAL USE Validation

export default router;
