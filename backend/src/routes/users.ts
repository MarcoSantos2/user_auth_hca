import { Router } from 'express';
import { 
        signup, 
        signin, 
        createUser, 
        updateUser, 
        deleteUser, 
        getUserById,
        addRoleToUser,
        getUserCompanies
        } from '../controllers/userController';
import { googleAuth } from '../middleware/googleAuth';
import { verifyToken, verifyPermissions } from '../middleware/authMiddleware';

const router = Router();

// base route: /api/users

// Routes for Utility Requests  
router.get('/:uuid/add/role/:slug', verifyToken, verifyPermissions, addRoleToUser);  // TODO delete comment - is this a get or a patch? Why is "add role" in the user route?

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

// Route to get all companies for a user
router.get('/:id/companies', verifyToken, getUserCompanies);

export default router;
