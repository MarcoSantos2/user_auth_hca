import { Router } from 'express';
import { getUsers, signup, signin, createUser, updateUser, deleteUser, getUserById } from '../controllers/userController';
import { googleAuth } from '../middleware/auth';


const router = Router();

// Route to handle GET requests for retrieving the list of users
router.get('/', getUsers);

// Route to handle user creation
router.post('/', createUser);

// TODO Get individual user by id
router.get('/:id', getUserById); 

// Partially updating user information
router.patch('/:id', updateUser); // ':id' is a parameter to identify the user

// Route for deleting a user
router.delete('/:id', deleteUser);

router.post('/signup', googleAuth, signin);
router.post('/signin', googleAuth, signup);

export default router;
