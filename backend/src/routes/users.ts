import express, { Request, Response } from 'express';
import { googleAuth, generateToken, hashPassword, comparePassword } from '../middleware/auth';

const router = express.Router();

// Mock Database
const users: any[] = [];

router.post('/signup', googleAuth, (req: Request, res: Response) => {
  const { email, name, sub } = req.body.user;
  let user = users.find(u => u.email === email);
  if (!user) {
    user = { id: sub, email, name, password: hashPassword(sub) };
    users.push(user);
  }
  const token = generateToken({ id: user.id, email: user.email });
  res.json({ token });
});

router.post('/signin', googleAuth, (req: Request, res: Response) => {
  const { email, sub } = req.body.user;
  const user = users.find(u => u.email === email);
  if (user && comparePassword(sub, user.password)) {
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  } else {
    res.status(401).send('Authentication failed');
  }
});

export default router;