import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';
//import { logger } from '../utils/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Unexpected errors
//   logger.error('Unexpected error:', err);
//   res.status(500).json({
//     success: false,
//     message: 'Internal Server Error'
//   });
}
