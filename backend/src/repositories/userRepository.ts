// This script Handles interactions with the database.

import db from '../db';
import { RowDataPacket } from 'mysql2';

interface User {
  id: number;
  email: string;
  password: string;
  verify: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

// Executes a SQL query to retrieve all users from the database
const findAll = async (): Promise<User[]> => {
  const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE deleted_at IS NULL');
  return rows as User[];
};

export default {
  findAll,
};
