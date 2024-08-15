export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    verify: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  }