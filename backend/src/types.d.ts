// add all types here

export interface UserJwtPayload {
  uuid: string;
  email: string;
  // Add any other properties that you include in the JWT payload
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserJwtPayload; // Attach the JWT payload to req.user
  }
}

