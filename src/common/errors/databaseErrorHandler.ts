import { DatabaseError as PgError } from 'pg';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { BadRequestError, ConflictError, DatabaseError, InternalServerError } from './ApiError';

const PG_ERROR_CODES = {
    UNIQUE_VIOLATION: '23505',
    FOREIGN_KEY_VIOLATION: '23503',
    NOT_NULL_VIOLATION: '23502',
    CHECK_VIOLATION: '23514',
    INVALID_TEXT_REPRESENTATION: '22P02',
} as const;

//  error codes
const PRISMA_ERROR_CODES = {
    UNIQUE_CONSTRAINT: 'P2002',
    FOREIGN_KEY_CONSTRAINT: 'P2003',
    RECORD_NOT_FOUND: 'P2025',
    REQUIRED_FIELD_MISSING: 'P2012',
} as const;

export function handleDatabaseError(error: unknown, context?: string): never {
    if (process.env.NODE_ENV === 'development') {
        console.error(`Database Error${context ? ` in ${context}` : ''}:`, error);
    }

    // Handle Prisma errors
    if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
            case PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT:
                const target = error.meta?.target as string[] | undefined;
                const field = target?.[0] || 'field';
                throw new ConflictError(`${field} already exists`);

            case PRISMA_ERROR_CODES.FOREIGN_KEY_CONSTRAINT:
                throw new BadRequestError('Invalid reference to related resource');

            case PRISMA_ERROR_CODES.RECORD_NOT_FOUND:
                throw new BadRequestError('Record not found');

            case PRISMA_ERROR_CODES.REQUIRED_FIELD_MISSING:
                throw new BadRequestError('Required field is missing');

            default:
                throw new DatabaseError('Database operation failed');
        }
    }

    // Handle PostgreSQL errors
    if (isPgError(error)) {
        const pgError = error as PgError;

        switch (pgError.code) {
            case PG_ERROR_CODES.UNIQUE_VIOLATION:
                // Extract field name from error detail if available
                const field = extractFieldFromUniqueViolation(pgError.detail);
                throw new ConflictError(
                    field ? `${field} already exists` : 'Resource already exists'
                );

            case PG_ERROR_CODES.FOREIGN_KEY_VIOLATION:
                throw new BadRequestError('Invalid reference to related resource');

            case PG_ERROR_CODES.NOT_NULL_VIOLATION:
                const column = pgError.column || 'field';
                throw new BadRequestError(`${column} is required`);

            case PG_ERROR_CODES.CHECK_VIOLATION:
                throw new BadRequestError('Data validation failed');

            case PG_ERROR_CODES.INVALID_TEXT_REPRESENTATION:
                throw new BadRequestError('Invalid data format');

            default:
                // For other database errors, don't expose details
                throw new DatabaseError('Database operation failed');
        }
    }

    // Handle known application errors (like Error with specific messages)
    if (error instanceof Error) {
        // Don't expose raw error messages in production
        if (process.env.NODE_ENV === 'development') {
            throw new DatabaseError(error.message);
        }
        throw new DatabaseError('Database operation failed');
    }

    // Unknown error type
    throw new InternalServerError('An unexpected error occurred');
}


function isPgError(error: unknown): error is PgError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof (error as any).code === 'string'
    );
}


function extractFieldFromUniqueViolation(detail?: string): string | null {
    if (!detail) return null;

    const match = detail.match(/Key \(([^)]+)\)/);
    if (match && match[1]) {
        // Convert snake_case to Title Case
        return match[1]
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return null;
}


export async function withDatabaseErrorHandling<T>(
    operation: () => Promise<T>,
    context?: string
): Promise<T> {
    try {
        return await operation();
    } catch (error) {
        handleDatabaseError(error, context);
    }
}
