import { Router } from 'express';
import { 
        signup, 
        signin, 
        createUser, 
        updateUser, 
        deleteUser, 
        getUserById,
        addRoleToUser,
        getUserCompanies,
        getUsers,
        resetPasswordRequest,
        verifyPasskey,
        changePassword
        } from '../controllers/userController';
import { googleAuth } from '../middleware/googleAuth';
import { verifyToken, verifyPermissions, verifyAdmin } from '../middleware/authMiddleware';
import { submitFeedback, getFeedbackByUserUuid, getFeedbackById, getAllFeedback, removeFeedback } from '../controllers/feedbackController';

const router = Router();

// base route: /api/users

// Routes for Utility Requests  
router.get('/:uuid/add/role/:slug', verifyToken, verifyPermissions, addRoleToUser);

// Routes to handle Google Sign-In (sub and email)
router.post('/signin', googleAuth, signin);
router.post('/signup', googleAuth, signup);


// Routes to handle direct user signin and signup (email and password)
router.post('/direct/signin', signin);
router.post('/direct/signup', signup);

// Routes for Admin use only
router.get('/', verifyToken, verifyAdmin, getUsers);

// Routes to submit feedback
router.post('/feedback', verifyToken, submitFeedback);
router.get('/feedback/user/:uuid', verifyToken, getFeedbackByUserUuid);
router.get('/feedback/:id', verifyToken, getFeedbackById);
router.delete('/feedback/:id', verifyToken, removeFeedback);
router.get('/feedbacks', verifyToken, getAllFeedback);

// Route to get all companies for a user
router.get('/:id/companies', verifyToken, getUserCompanies);

// Routes to request password reset
router.post('/reset-password', resetPasswordRequest);
router.post('/verify-passkey', verifyPasskey);
router.post('/change-password', verifyToken, changePassword);

// Routes CRUD for Users - keep at the bottom of the file
router.post('/', verifyToken, verifyPermissions, createUser); 
router.get('/:id', verifyToken, verifyPermissions, getUserById); 
router.patch('/:id', verifyToken, verifyPermissions, updateUser); 
router.delete('/:id', verifyToken, verifyPermissions, deleteUser);

export default router;
