import { Router } from "express";

import { AuthMiddleware } from "@/common/middlewares/auth.middleware";
import { authorizeRoles } from "@/common/middlewares/authorize.middleware";
import { AdminController } from "./admin.controller";

const router = Router();

router.get('/users', AuthMiddleware, authorizeRoles('admin'), AdminController.getAllUser)

export default router;