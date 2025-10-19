import { Response } from 'express';

import { ApiError } from '../errors/ApiError';
import { handleDatabaseError } from '../errors/databaseErrorHandler';

export function handleControllerError(error: any, res: Response, context?: string) {
    // 1. Xử lý ApiError (custom errors từ Service)
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }

    // 2. Xử lý Database Error
    if (error.code) {
        try {
            handleDatabaseError(error, context);
        } catch (apiError: any) {
            return res.status(apiError.statusCode).json({
                success: false,
                message: apiError.message,
            });
        }
    }

    // 3. Lỗi không xác định
    console.error(`Unexpected error${context ? ` in ${context}` : ''}:`, error);
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
}