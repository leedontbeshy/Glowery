import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "@/common/middlewares/auth.middleware";

const router = Router();

// POST /api/auth/register
router.post("/register", AuthController.register);

// POST /api/auth/login
router.post("/login", AuthController.login);

router.post("/logout",AuthMiddleware,AuthController.logout)

export default router;