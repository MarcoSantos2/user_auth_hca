import { Router } from 'express';
import { createRole, 
    getRole,
    getRoles,
    updateRole, 
    deleteRole, 
    addUserToRole, 
    addPermissionToRole, 
    addPermissionsToRole } from '../controllers/roleController';
import { verifyToken, verifyPermissions, verifyAdmin } from '../middleware/authMiddleware';

const router = Router();

// Base route: /api/roles

// Routes for Utility Requests
router.get('/:slug/add/user/:uuid', verifyToken, verifyPermissions, addUserToRole); 
router.get('/:slug/add/permission/:permission_slug', verifyToken, verifyPermissions, addPermissionToRole);
router.post('/:slug/add/permissions', verifyToken, verifyPermissions, addPermissionsToRole);

// Routes for CRUD operations on roles
router.post('/', verifyToken, verifyPermissions, createRole); 
router.get('/:slug', verifyToken, verifyPermissions, getRole); 
router.patch('/:slug', verifyToken, verifyPermissions, updateRole); 
router.delete('/:slug', verifyToken, verifyPermissions, deleteRole); 

// Routes for Admin use only
router.get('/', verifyToken, verifyAdmin, getRoles);

export default router;