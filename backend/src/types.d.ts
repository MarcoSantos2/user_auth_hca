// add all types here

export interface UserJwtPayload {
  uuid: string;
  email: string;
  // Add any other properties that you include in the JWT payload
}

declare module 'server-destroy' {
  import { Server } from 'http';

  function destroy(server: Server): void;

  export = destroy;
}


export interface UserData {
  email: string;
  name: string;
  password?: string;
  googleId?: string;
  picture?: string;
  sub?: string;
}

interface DirectLoginPayload {
  email: string;
  password: string;
}

interface ExternalLoginPayload {
  email: string;
  sub: string;
  googleId?: string;
}