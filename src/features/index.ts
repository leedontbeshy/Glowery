//Gộp các route từ tất cả feature
import { Router } from "express";
import authRoutes from "./auth/auth.route";
//import userRoutes from "./auth/user.route";

const router = Router();

router.use("/auth", authRoutes);
//router.use("/users", userRoutes);


export default router;