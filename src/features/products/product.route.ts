import { Router } from "express";

import { authMiddleware } from "@/common/middlewares/auth.middleware";

import { ProductController } from "./product.controller";

const router = Router();

router.get('/all-products', ProductController.getAllProduct);
router.get('/:id', ProductController.getProductById)

export default router;