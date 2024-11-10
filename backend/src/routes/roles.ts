import { Router } from 'express';
import { createRole, 
    getRole, 
    updateRole, 
    deleteRole, 
    addUserToRole, 
    addPermissionToRole, 
    addPermissionsToRole } from '../controllers/roleController';
import { verifyToken, verifyPermissions } from '../middleware/authMiddleware';

const router = Router();

// Base route: /api/roles

// Routes for Utility Requests
router.get('/:slug/add/user/:uuid', verifyToken, verifyPermissions, addUserToRole); // TODO - delete comment - should this be a PATCH?
router.get('/:slug/add/permission/:permission_slug', verifyToken, verifyPermissions, addPermissionToRole); // TODO - delete comment - should this be a PATCH?
router.post('/:slug/add/permissions', verifyToken, verifyPermissions, addPermissionsToRole);

// Routes for CRUD operations on roles
router.post('/', verifyToken, verifyPermissions, createRole); // Create
router.get('/:slug', verifyToken, verifyPermissions, getRole); // Read
router.patch('/:slug', verifyToken, verifyPermissions, updateRole); // Update
router.delete('/:slug', verifyToken, verifyPermissions, deleteRole); // Delete

export default router;
