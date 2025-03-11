import jwt from 'jsonwebtoken';

export const generateToken = (payload: { uuid: string; email: string }, expiration: string | number = "1h"): string => { 
  return jwt.sign(
    payload,
    (process.env.JWT_SECRET as string),
    { expiresIn: expiration } // Examples of accepted expirations: https://github.com/vercel/ms
  );
};
