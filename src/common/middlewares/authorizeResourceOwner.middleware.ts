import { Request, Response, NextFunction } from 'express';

export const authorizeResourceOwner = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authenticatedUserId = req.user?.id;
    const requestedUserId = Number(req.params.id);

    if (!authenticatedUserId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Validate requested user ID
    if (isNaN(requestedUserId) || requestedUserId <= 0) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Allow admins to access any user's resources
    if (req.user?.role === 'admin') {
      return next();
    }

    // Verify the user is accessing their own resource
    if (authenticatedUserId !== requestedUserId) {
      return res.status(403).json({ message: 'You do not have access to this resource' });
    }

    next();
  } catch (error) {
    console.error('Resource owner authorization error:', error);
    return res.status(500).json({ message: 'Authorization error occurred' });
  }
};
