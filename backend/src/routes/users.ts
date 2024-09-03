import { Router } from 'express';
import { getUsers, signup, signin, createUser, updateUser, deleteUser, getUserById } from '../controllers/userController';
import { googleAuth } from '../middleware/auth';
import { verifyToken } from '../middleware/authMiddleware'; // Import the middleware


const router = Router();

// Route to handle direct user signin and signup (email and password)
router.post('/direct/signin', signin);
router.post('/direct/signup', signup);

// Routes for CRUD operations on users
router.get('/', verifyToken, getUsers);
router.post('/', verifyToken, createUser); 
router.get('/:id', verifyToken, getUserById); 
router.patch('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser); 

// Route to handle Google Sign-In (sub and email)
router.post('/signin', googleAuth, signin);
router.post('/signup', googleAuth, signup);


export default router;
