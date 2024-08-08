import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token;
    console.log('Expected audience:', process.env.GOOGLE_CLIENT_ID);
    console.log('Received token:', token);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Ensure this matches the client ID
    });
    const payload = ticket.getPayload();
    console.log('Payload:', payload);
    if (!payload) {
      return res.status(400).send('Invalid Google Token');
    }
    req.body.user = payload;
    next();
  } catch (error) {
    console.error('Google Authentication Failed:', error);
    res.status(500).send('Authentication Failed');
  }
};

export const generateToken = (user: any) => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign(user, secret, { expiresIn: '1h' });
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};