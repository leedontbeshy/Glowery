import { Router } from "express";

import { AuthMiddleware } from "@/common/middlewares/auth.middleware";

import { UserController } from "./user.controller";

const router = Router();

router.get('/:id', UserController.getUserInfo);
router.put('/profile/:id', AuthMiddleware, UserController.updateUserInfo);

export default router;