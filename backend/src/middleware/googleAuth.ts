// src/middleware/googleAuth.ts
import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';

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
      googleId: payload.sub,
      picture_url: payload.picture || '',
      email_verified: payload.email_verified || false
    };

    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
}


  

  