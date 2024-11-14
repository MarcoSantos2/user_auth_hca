 import { Router } from 'express';
 import { submitFeedback } from '../controllers/feedbackController';
 import { verifyToken } from '../middleware/authMiddleware';
 
 const router = Router();
 
 // base route: /api/feedback
 
 // Route to submit feedback
 router.post('/', verifyToken, submitFeedback);
 
 export default router;