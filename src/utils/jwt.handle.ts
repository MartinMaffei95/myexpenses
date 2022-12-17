import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
const JWT_SECRET = `${process.env.JWT_SECRET}`;

const generateToken = async (id: string) => {
  const jwt = sign({ id }, JWT_SECRET);
  return jwt;
};

const verifyToken = async (jwt: string) => {
  try {
    const user = await verify(jwt, JWT_SECRET);
    return user;
  } catch (e) {
    console.log(e);
  }
};

export { generateToken, verifyToken };
