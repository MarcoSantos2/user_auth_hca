// add all types here

export interface MyJwtPayload {
  uuid: string;
  email: string;
  // Add any other properties that you include in the JWT payload
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: MyJwtPayload; // Attach the JWT payload to req.user
  }
}

