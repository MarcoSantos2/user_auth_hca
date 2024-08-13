// This script Handles interactions with the database

import { RowDataPacket } from 'mysql2';
import { User } from '../models/User'; // Shared User interface


const findAll = async (): Promise<User[]> => {
  const users: User[] = [
    {
      id: 1,
      email: 'user1@felipe.com',
      name: 'felipao',
      password: 'hashed_password1',
      verify: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 2,
      email: 'stargate@SG11.com',
      name: 'User Two',
      password: 'hashed_password2',
      verify: false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 3,
      email: 'testando@vamosla.com',
      name: 'User Three',
      password: 'hashed_password3',
      verify: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  ];

  return users;
};

export default {
  findAll,
};


// Executes a SQL query to retrieve all users from the database
/*
const findAll = async (): Promise<User[]> => {
  const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE deleted_at IS NULL');
  return rows as User[];
};

export default {
  findAll,
};
*/