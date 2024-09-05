import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserJwtPayload } from '../types';
import { getUserByUuid } from '../services/userService'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  // Verify if signature and exp is ok. If it is, find user and add to body of request
  jwt.verify(token, process.env.JWT_SECRET || '', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    try {
      const user = await getUserByUuid((decoded as UserJwtPayload).uuid);
      req.body.user = user;
      next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid user' });
    }   
  });
};
