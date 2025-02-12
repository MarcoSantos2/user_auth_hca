import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {      
    const secret = process.env.JWT_SECRET as string;
    return jwt.sign(user, secret, { expiresIn: '1h' });
  };