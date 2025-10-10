import { Router } from 'express';

import { AuthMiddleware } from '@/common/middlewares/auth.middleware';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const router = Router();

// POST /api/auth/register
router.post('/register', AuthController.register);

// POST /api/auth/login
router.post('/login', AuthController.login);

router.post('/logout', AuthMiddleware, AuthController.logout);

router.post('/reset-password', AuthController.forgetPassword);

router.post('/reset-password/confirm', AuthController.resetPassword);

export default router;
