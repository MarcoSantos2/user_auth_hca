// add all types here

export interface UserJwtPayload {
  uuid: string;
  email: string;
  // Add any other properties that you include in the JWT payload
}

export interface UserData {
  email: string;
  name: string;
  password?: string;
  googleId?: string;
  picture?: string;
}

export type CreateRole = Pick<Role, "name" | "description" | "slug" | "company">;

export type UpdateRole = Pick<Role, "name" | "description" | "slug">;

interface DirectLoginPayload {
  email: string;
  password: string;
}

interface ExternalLoginPayload {
  email: string;
  googleId?: string;
}
