import { Router } from 'express';
import { sendEmail } from '../utils/email';

const router = Router();

// Base route: /api/email   

// Route to send an email
router.post('/send', async (req, res) => {
  console.log('Request body:', req.body);
  const { to, subject, text, html } = req.body;
  try {
    await sendEmail(to, subject, text, html);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: (error as Error).message });
  }
});

export default router;
