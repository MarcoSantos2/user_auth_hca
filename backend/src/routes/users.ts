import { Router } from 'express';
import { getUsers, signup, signin, createUser, updateUser, deleteUser, getUserById } from '../controllers/userController';
import { googleAuth } from '../middleware/auth';


const router = Router();

// Route to handle direct user signin and signup (email and password)
router.post('/direct/signin', signin);
router.post('/direct/signup', signup);

// Routes for CRUD operations on users
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

// Route to handle Google Sign-In (sub and email)
router.post('/signin', googleAuth, signin);
router.post('/signup', googleAuth, signup);


export default router;
