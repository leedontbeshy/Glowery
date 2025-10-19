import { Request, Response, NextFunction } from 'express';

import { TokenRepository } from '@/features/auth/token/token.repository';
import { verifyAccessToken } from '@/common/utils/jwt';

import { JwtPayLoad } from '../types/jwt.type';



export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ message: 'Token not provided' });
            return;
        }
        // Kiểm tra token có trong blacklist không
        const isBlacklisted = await TokenRepository.isBlacklisted(token);
        if (isBlacklisted) {
            res.status(401).json({ message: 'The token has been disabled' });
            return;
        }
        // Verify access token using configured access secret
        const decoded = verifyAccessToken(token) as JwtPayLoad;

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }
        next();
        return;
    } catch (error: any) {
        res.status(401).json({ message: 'The token is invalid or has expired' });
        return;
    }
};
