import { Request, Response, NextFunction } from 'express';

import { UserRole } from '@/common/constants/user.enums';

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        res.status(403).json({ message: 'Unable to determine user role' });
        return;
      }

      if (!allowedRoles.includes(userRole)) {
        res.status(403).json({ message: 'You do not have permission to perform this action' });
        return;
      }

      next();
      return;
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(500).json({ message: 'Authorization error occurred' });
      return;
    }
  };
};


