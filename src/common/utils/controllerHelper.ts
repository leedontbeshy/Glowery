import { Response } from 'express';

import { ApiError } from '../errors/ApiError';
import { handleDatabaseError } from '../errors/databaseErrorHandler';

/**
 * Centralized error handler for controllers
 * Converts different error types into proper HTTP responses
 */
export function handleControllerError(error: any, res: Response, context?: string) {
    // 1. ApiError (custom errors from Service)
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        });
    }

    // 2. Database Error (Prisma/PostgreSQL)
    if (error.code && typeof error.code === 'string') {
        try {
            // handleDatabaseError will throw an ApiError
            handleDatabaseError(error, context);
        } catch (apiError) {
            if (apiError instanceof ApiError) {
                return res.status(apiError.statusCode).json({
                    success: false,
                    message: apiError.message,
                    ...(process.env.NODE_ENV === 'development' && { stack: apiError.stack }),
                });
            }
        }
    }

    // 3. Unexpected error
    console.error(`Unexpected error${context ? ` in ${context}` : ''}:`, error);
    return res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' 
            ? error?.message || 'Internal server error'
            : 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: error?.stack }),
    });
}