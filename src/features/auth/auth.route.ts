import { Router } from 'express';

import { authMiddleware } from '@/common/middlewares/auth.middleware';

import { AuthController } from './auth.controller';

const router = Router();

// POST /api/auth/register
router.post('/register', AuthController.register);

// POST /api/auth/login
router.post('/login', AuthController.login);

router.post('/logout', authMiddleware, AuthController.logout);

router.post('/reset-password', AuthController.forgetPassword);

router.post('/reset-password/confirm', AuthController.resetPassword);

export default router;
