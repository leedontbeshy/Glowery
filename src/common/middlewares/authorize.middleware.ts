import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@/common/constants/user.enums';

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        return res.status(403).json({ message: 'Không xác định được quyền truy cập' });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Lỗi phân quyền' });
    }
  };
};
