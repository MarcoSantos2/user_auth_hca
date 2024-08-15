import { User } from '../models/User';


const findAll = (): User[] => {
 return [
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
    {
      id: 4,
      email: 'JACKONEILL@vamosla.com',
      name: 'User FOUR',
      password: 'hashed_password4',
      verify: false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },

  ];

};

export default {
  findAll,
};