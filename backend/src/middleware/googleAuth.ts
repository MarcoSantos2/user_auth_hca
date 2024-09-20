// src/middleware/googleAuth.ts
import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleAuth(req: Request, res: Response, next: NextFunction) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is missing from request body' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.sub) {
      return res.status(400).json({ message: 'Invalid token payload' });
    }

    req.body.user = {
      email: payload.email,
      name: payload.name || '',
      sub: payload.sub,
      picture: payload.picture || '',
    };

    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
}

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