import { Router } from 'express';
import { createRole, getRoles, getRole, updateRole, deleteRole, addUserToRole, addPermissionToRole, addPermissionsToRole } from '../controllers/roleController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// Base route: /api/roles

// Routes for Utility Requests
router.get('/', verifyToken, getRoles);
router.get('/:slug/add/user/:uuid', verifyToken, addUserToRole);
router.get('/:slug/add/permission/:permission_slug', verifyToken, addPermissionToRole);
router.post('/:slug/add/permissions', verifyToken, addPermissionsToRole);

// Routes for CRUD operations on users
router.post('/', verifyToken, createRole); // Create
router.get('/:slug', verifyToken, getRole); // Read
router.patch('/:slug', verifyToken, updateRole); // Update
router.delete('/:slug', verifyToken, deleteRole); // Delete

export default router;
