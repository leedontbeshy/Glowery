import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { TokenRepository } from '@/features/auth/token/token.repository';

// Mở rộng interface Request để thêm user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            };
        }
    }
}

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Token không được cung cấp' });
        }
        // Kiểm tra token có trong blacklist không
        const isBlacklisted = await TokenRepository.isBlacklisted(token);
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token đã bị vô hiệu hóa' });
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number;
            email: string;
        };

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};
