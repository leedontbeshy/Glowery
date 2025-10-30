import { Request, Response, NextFunction } from 'express';

import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO, GetProductsQueryDTO } from './product.dto';

export class ProductController {
  // GET /api/v1/product - Get all products with pagination and filters
  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as GetProductsQueryDTO;
      const result = await ProductService.getAllProducts(query);

      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/product/:id - Get product by ID
  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.id);
      const product = await ProductService.getProductById(productId);

      res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/product - Create new product (seller or admin)
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateProductDTO = req.body;
      const userId = req.user!.id; // From auth middleware

      const result = await ProductService.createProduct(data, userId);

      res.status(201).json({
        success: true,
        message: result.message,
        data: result.product,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/product/:id - Update product
  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.id);
      const data: UpdateProductDTO = req.body;
      const userId = req.user!.id;
      const userRole = req.user!.role;

      const result = await ProductService.updateProduct(productId, data, userId, userRole);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.product,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/v1/product/:id - Delete product (soft delete)
  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.id);
      const userId = req.user!.id;
      const userRole = req.user!.role;

      const result = await ProductService.deleteProduct(productId, userId, userRole);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

