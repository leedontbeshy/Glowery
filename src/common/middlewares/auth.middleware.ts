import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { TokenRepository } from '@/features/auth/token/token.repository';
import { UserRole } from '../constants/user.enums';

// Mở rộng interface Request để thêm user

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
            role: UserRole
        };

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }
        next();
    } catch (error: any) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};
