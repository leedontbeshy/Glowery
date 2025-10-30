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

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Get all products with pagination and filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, out_of_stock]
 *         description: Filter by product status
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, newest, popular, best_selling]
 *         description: Sort products
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
router.get(
  '/',
  validateRequest(getProductsQuerySchema),
  ProductController.getAllProducts
);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */
router.get(
  '/:id',
  validateRequest(getProductByIdSchema),
  ProductController.getProductById
);

/**
 * @swagger
 * /api/v1/product:
 *   post:
 *     summary: Create new product (seller or admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               discount_price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               sku:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, inactive, out_of_stock]
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  authMiddleware,
  authorizeRoles('seller', 'admin'),
  validateRequest(createProductSchema),
  ProductController.createProduct
);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   put:
 *     summary: Update product (seller owner or admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               discount_price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               sku:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, inactive, out_of_stock]
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('seller', 'admin'),
  validateRequest(updateProductSchema),
  ProductController.updateProduct
);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Delete product (seller owner or admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('seller', 'admin'),
  validateRequest(deleteProductSchema),
  ProductController.deleteProduct
);

export default router;

