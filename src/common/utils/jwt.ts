import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRole } from '../constants/user.enums';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as Secret;

export interface Jwt_Payload  {
    id: number;
    email: string;
    role: UserRole;
}


if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable');
}

export function signToken(payload: Jwt_Payload, expiresIn: string | number): string {
    const opions = { expiresIn } as SignOptions;
    return jwt.sign(payload, JWT_SECRET as jwt.Secret, opions);
}

export function verifyToken(token: string): Jwt_Payload {
    try {
        return jwt.verify(token, JWT_SECRET) as Jwt_Payload;
    } catch (error: any) {
        throw new Error('Invalid or expired token');
    }
}

export function getTokenExpiration(token: string): Date | null {
    try {
        const decoded = jwt.decode(token) as { exp?: number } | null;
        if (!decoded?.exp) return null;
        return new Date(decoded.exp * 1000);
    } catch (err) {
        console.error('Failed to decode token:', err);
        return null;
    }
}
