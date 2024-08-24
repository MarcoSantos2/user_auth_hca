import { Router } from 'express';
import { getUsers, signup, signin, createUser, updateUser, deleteUser } from '../controllers/userController';
import { googleAuth } from '../middleware/auth';


const router = Router();

// Route to handle GET requests for retrieving the list of users
router.get('/', getUsers);

// Route to handle user creation
router.post('/create', createUser);

router.post('/signup', googleAuth, signin);
router.post('/signin', googleAuth, signup);

// Partially updating user information
router.patch('/update/:id', updateUser); // ':id' is a parameter to identify the user

// Route for deleting a user
router.delete('/delete/:id', deleteUser);

export default router;
