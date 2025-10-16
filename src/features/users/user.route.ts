import { Router } from 'express';

import { authMiddleware } from '@/common/middlewares/auth.middleware';
import { authorizeResourceOwner } from '@/common/middlewares/authorizeResourceOwner.middleware';

import { UserController } from './user.controller';

const router = Router();

router.get('/:id', authMiddleware, authorizeResourceOwner, UserController.getUserInfo);
router.put('/profile', authMiddleware, UserController.updateUserInfo);
router.put('/profile/change-password', authMiddleware, UserController.updatePassword);
export default router;
