import { Router } from 'express';

import { authMiddleware } from '@/common/middlewares/auth.middleware';
import { validateBody } from '@/common/middlewares/validate.middleware';

import { AuthController } from './auth.controller';
import { loginSchema, registerSchema, refreshTokenSchema, resetPasswordRequestSchema, resetPasswordSchema } from './auth.schema';

const router = Router();

// POST /api/auth/register
router.post('/register', validateBody(registerSchema), AuthController.register);

// POST /api/auth/login
router.post('/login', validateBody(loginSchema), AuthController.login);

router.post('/logout', authMiddleware, AuthController.logout);

router.post('/reset-password', validateBody(resetPasswordRequestSchema), AuthController.forgetPassword);

router.post('/reset-password/confirm', validateBody(resetPasswordSchema), AuthController.resetPassword);

// POST /api/auth/refresh-token
router.post('/refresh-token', validateBody(refreshTokenSchema), AuthController.refreshToken);

export default router;
