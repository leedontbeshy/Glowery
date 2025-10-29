import { Router } from "express";

import { authMiddleware } from "@/common/middlewares/auth.middleware";
import { validateBody } from "@/common/middlewares/validate.middleware";

import { ProductController } from "./product.controller";
import { createProductSchema } from "./product.schema";

const router = Router();

router.get('/all-products', ProductController.getAllProduct);
router.get('/:id', ProductController.getProductById);
router.post('/', authMiddleware, validateBody(createProductSchema), ProductController.createProduct);

export default router;