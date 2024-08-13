//Keep only one definition of the User interface in a separate file. Both userService.ts and userRepository.ts can import to ensures consistency

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