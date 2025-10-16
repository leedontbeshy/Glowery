import { Request, Response, NextFunction } from 'express';

import { UserRole } from '@/common/constants/user.enums';

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        return res.status(403).json({ message: 'Unable to determine user role' });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'You do not have permission to perform this action' });
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({ message: 'Authorization error occurred' });
    }
  };
};


