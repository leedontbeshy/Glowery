import { Router } from "express";

import { authMiddleware } from "@/common/middlewares/auth.middleware";
import { authorizeRoles } from "@/common/middlewares/authorize.middleware";

import { AdminController } from "./admin.controller";

const router = Router();

router.get('/users', authMiddleware, authorizeRoles('admin'), AdminController.getAllUser)

export default router;