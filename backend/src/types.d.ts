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
  picture_url?: string;
  email_verified?: boolean;
}

export type CreateRole = Pick<Role, "name" | "description" | "slug" | "company">;

export type UpdateRole = Pick<Role, "name" | "description" | "slug">;

interface BaseLoginPayload {
  email: string;
  stayConnected?: boolean;
}

interface DirectLoginPayload extends BaseLoginPayload {
  password: string;
}

interface ExternalLoginPayload extends BaseLoginPayload {
  googleId?: string;
}
