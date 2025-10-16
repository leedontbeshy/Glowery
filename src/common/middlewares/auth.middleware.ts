import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { TokenRepository } from '@/features/auth/token/token.repository';

import { JwtPayLoad } from '../types/jwt.type';



export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }
        // Kiểm tra token có trong blacklist không
        const isBlacklisted = await TokenRepository.isBlacklisted(token);
        if (isBlacklisted) {
            return res.status(401).json({ message: 'The token has been disabled' });
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayLoad

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }
        next();
    } catch (error: any) {
        return res.status(401).json({ message: 'The token is invalid or has expired' });
    }
};
