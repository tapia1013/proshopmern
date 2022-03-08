import bcrypt, { hashSync } from "bcryptjs";

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Cookie',
    email: 'cookie@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Nye',
    email: 'nye@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];


export default users;