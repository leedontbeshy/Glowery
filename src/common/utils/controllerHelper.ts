import { Response } from 'express';

import { ApiError } from '../errors/ApiError';
import { handleDatabaseError } from '../errors/databaseErrorHandler';

export function handleControllerError(error: any, res: Response, context?: string) {
    // 1. ApiError (custom errors from Service)
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }

    // 2. Database Error (PostgreSQL)
    if (error.code && typeof error.code === 'string') {
        try {
            handleDatabaseError(error, context);
        } catch (apiError) {
            if (apiError instanceof ApiError) {
                return res.status(apiError.statusCode).json({
                    success: false,
                    message: apiError.message,
                });
            }
        }
    }

    // 3. Unexpected error
    console.error(`Unexpected error${context ? ` in ${context}` : ''}:`, error);
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
}