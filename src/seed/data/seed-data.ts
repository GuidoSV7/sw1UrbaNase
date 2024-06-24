import * as bcrypt from 'bcrypt';

interface SeedProduct{
  name: string;
  description: string;
  price: number;
  tags: string[];
  fotos: string[];
  idInfraestructure: number;
  idCategory: number;
}

interface SeedUser {
  email: string;
  name: string;
  password: string;
  roles: string[];
}

interface SeedData {
  users: SeedUser[];

  products: SeedProduct[];
}

export const initialData: SeedData = {
  
  products:[
  {
    name: 'Coca Cola',
    description: 'Bebida Gaseosa',
    price: 12.50,
    tags: ['Bebida','Gaseosa'],
    fotos: [
      'https://www.12deabril.edu.bo/wp-content/uploads/2021/04/IMG_20210401_095356.jpg',
      'https://www.12deabril.edu.bo/wp-content/uploads/2021/04/IMG_20210401_095356.jpg',
      'https://www.12deabril.edu.bo/wp-content/uploads/2021/04/IMG_20210401_095356.jpg',
    ],
    idInfraestructure: 1,
    idCategory: 1,

    
  },



  ],

  users: [
    {
      email: 'SoftwareSig@gmail.com',
      name: 'Software Sig Super User',
      password: bcrypt.hashSync('123456', 10),
      roles: ['user', 'super-user'],
    },

    {
      email: 'Admin@gmail.com',
      name: 'Software Sig Admin',
      password: bcrypt.hashSync('123456', 10),
      roles: ['admin'],
    },
    {
      email: 'test1@gmail.com',
      name: 'User 1',
      password: bcrypt.hashSync('123456', 10),
      roles: ['user'],
    },
    {
      email: 'test2@gmail.com',
      name: 'User 2',
      password: bcrypt.hashSync('123456', 10),
      roles: ['user'],
    },
  ],

};
