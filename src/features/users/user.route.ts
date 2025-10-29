import { Router } from 'express';

import { authMiddleware } from '@/common/middlewares/auth.middleware';
import { authorizeResourceOwner } from '@/common/middlewares/authorizeResourceOwner.middleware';
import { validateBody } from '@/common/middlewares/validate.middleware';

import { UserController } from './user.controller';
import { updateUserSchema, changePasswordSchema } from './user.schema';

const router = Router();

router.get('/:id', authMiddleware, authorizeResourceOwner, UserController.getUserInfo);
router.put('/profile', authMiddleware, validateBody(updateUserSchema), UserController.updateUserInfo);
router.put('/profile/change-password', authMiddleware, validateBody(changePasswordSchema), UserController.updatePassword);
export default router;
