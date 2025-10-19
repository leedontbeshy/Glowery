import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

import { JwtPayLoad } from '../types/jwt.type';
dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as Secret;
const JWT_REFRESH_SECRET=process.env.JWT_REFRESH_SECRET as Secret;

if (!JWT_ACCESS_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable');
};

export function signAccessToken(payload: JwtPayLoad, expiresIn: string | number): string {
    const options = { expiresIn } as SignOptions;
    return jwt.sign(payload, JWT_ACCESS_SECRET as jwt.Secret, options);
};

export function signRefreshToken(payload: JwtPayLoad, expiresIn: string | number): string{
    const options = {expiresIn} as SignOptions;
    return jwt.sign(payload, JWT_REFRESH_SECRET as jwt.Secret,options )
};

export function verifyAccessToken(token: string): JwtPayLoad {
    try {
        return jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayLoad;
    } catch (error: any) {
        throw new Error('Invalid or expired token');
    }
};

export function verifyRefreshToken(token: string): JwtPayLoad {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayLoad;
    } catch (error: any) {
        throw new Error('Invalid or expired refresh token');
    }
};



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
