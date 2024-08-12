// Script defines the routes related to user actions (signup and signin) and maps them to the appropriate controller methods.

import { Router } from 'express';
import userController from '../controllers/userController';
import { googleAuth } from '../middleware/auth';

const router = Router();

router.post('/signup', googleAuth, userController.signup);
router.post('/signin', googleAuth, userController.signin);

export default router;
