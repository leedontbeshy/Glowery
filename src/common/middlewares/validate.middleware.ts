import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

import { BadRequestError } from '@/common/errors/ApiError';

/**
 * Middleware to validate request data against a Zod schema
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 * 
 * @example
 * router.post('/login', validateRequest(loginSchema), AuthController.login);
 */
export const validateRequest = (schema: ZodTypeAny) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            // Validate request body, query, and params
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // Extract first error message
                const firstError = error.issues[0];
                const message = firstError.message || 'Validation failed';
                
                return next(new BadRequestError(message));
            }
            
            next(error);
        }
    };
};

/**
 * Middleware to validate only request body
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 * 
 * @example
 * router.post('/register', validateBody(registerSchema), AuthController.register);
 */
export const validateBody = (schema: ZodTypeAny) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const firstError = error.issues[0];
                const message = firstError.message || 'Validation failed';
                
                return next(new BadRequestError(message));
            }
            
            next(error);
        }
    };
};

/**
 * Middleware to validate only query parameters
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 * 
 * @example
 * router.get('/products', validateQuery(productQuerySchema), ProductController.getAll);
 */
export const validateQuery = (schema: ZodTypeAny) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.query = await schema.parseAsync(req.query) as any;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const firstError = error.issues[0];
                const message = firstError.message || 'Validation failed';
                
                return next(new BadRequestError(message));
            }
            
            next(error);
        }
    };
};

/**
 * Middleware to validate only route parameters
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 * 
 * @example
 * router.get('/users/:id', validateParams(idParamSchema), UserController.getById);
 */
export const validateParams = (schema: ZodTypeAny) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.params = await schema.parseAsync(req.params) as any;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const firstError = error.issues[0];
                const message = firstError.message || 'Validation failed';
                
                return next(new BadRequestError(message));
            }
            
            next(error);
        }
    };
};
