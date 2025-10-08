import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(payload:object, expiresIn: number): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn
    });
}

export function verifyToken<T = any>(token:string):T{
    try {
        return jwt.verify(token, JWT_SECRET) as T
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}