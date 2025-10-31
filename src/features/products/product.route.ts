import { Router } from 'express';

import { authMiddleware } from '@/common/middlewares/auth.middleware';
import { authorizeRoles } from '@/common/middlewares/authorize.middleware';
import { validateRequest } from '@/common/middlewares/validate.middleware';

import { ProductController } from './product.controller';
import {
  createProductSchema,
  updateProductSchema,
  getProductByIdSchema,
  deleteProductSchema,
  getProductsQuerySchema
} from './product.schema';

const router = Router();

// GET /api/v1/product - Get all products with pagination and filters

router.get(
  '/',
  validateRequest(getProductsQuerySchema),
  ProductController.getAllProducts
);

// GET /api/v1/product/:id - Get product by ID

router.get(
  '/:id',
  validateRequest(getProductByIdSchema),
  ProductController.getProductById
);

// POST /api/v1/product - Create new product (seller or admin only)

router.post(
  '/',
  authMiddleware,
  authorizeRoles('seller', 'admin'),
  validateRequest(createProductSchema),
  ProductController.createProduct
);

// PUT /api/v1/product/:id - Update product (seller owner or admin only)

router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('seller', 'admin'),
  validateRequest(updateProductSchema),
  ProductController.updateProduct
);

// DELETE /api/v1/product/:id - Delete product (seller owner or admin only)

router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('seller', 'admin'),
  validateRequest(deleteProductSchema),
  ProductController.deleteProduct
);

export default router;

