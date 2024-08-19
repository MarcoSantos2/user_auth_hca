import { Router } from 'express';
import { getUsers, signup, signin } from '../controllers/userController';
import { googleAuth } from '../middleware/auth';


const router = Router();

// Route to handle GET requests for retrieving the list of users
router.get('/', getUsers);

router.post('/signup', googleAuth, signin);
router.post('/signin', googleAuth, signup);

export default router;
