import { Router } from "express";

import { UserController } from "./user.controller";
import { AuthMiddleware } from "@/common/middlewares/auth.middleware";

const router = Router();

router.get('/:id', UserController.getUserInfo);
router.put('/profile/:id', AuthMiddleware, UserController.updateUserInfo);

export default router;