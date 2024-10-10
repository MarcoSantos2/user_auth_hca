import { Router } from 'express';
import { 
        getUsers, 
        signup, 
        signin, 
        createUser, 
        updateUser, 
        deleteUser, 
        getUserById,
        addRoleToUser
        } from '../controllers/userController';
import { googleAuth } from '../middleware/googleAuth';
import { verifyToken, verifyPermissions } from '../middleware/authMiddleware';

const router = Router();

// base route: /api/users

// Routes for Utility Requests
router.get('/', verifyToken, verifyPermissions, getUsers);  
router.get('/:uuid/add/role/:slug', verifyToken, verifyPermissions, addRoleToUser);

// Routes for CRUD operations on users
router.post('/', verifyToken, verifyPermissions, createUser); // Create
router.get('/:id', verifyToken, verifyPermissions, getUserById); // Read
router.patch('/:id', verifyToken, verifyPermissions, updateUser); // Update
router.delete('/:id', verifyToken, verifyPermissions, deleteUser); // Delete

// Route to handle Google Sign-In (sub and email)
router.post('/signin', googleAuth, signin);
router.post('/signup', googleAuth, signup);
// Route to handle direct user signin and signup (email and password)
router.post('/direct/signin', signin);
router.post('/direct/signup', signup);

export default router;
