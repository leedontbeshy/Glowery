import jwt, {SignOptions, Secret} from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as Secret;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

export function signToken(payload: object, expiresIn:string | number): string {
    const opions = {expiresIn} as SignOptions;
  return jwt.sign(payload, JWT_SECRET as jwt.Secret, opions);
}

export function verifyToken<T = any>(token: string): T {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

