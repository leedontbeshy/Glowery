import { ConflictError, NotFoundError, BadRequestError } from "@/common/errors/ApiError";

import { ProductRepository } from "./product.repository";
import { CreateProductDTO, UpdateProductDTO, GetProductsQueryDTO } from "./product.dto";
import { ProductBasic, ProductListResponse } from "./product.type";

export class ProductService {
  // Get all products with pagination and filters
  static async getAllProducts(query: GetProductsQueryDTO): Promise<ProductListResponse> {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '20');
    const offset = (page - 1) * limit;

    const filters = {
      status: query.status,
      category_id: query.category_id ? parseInt(query.category_id) : undefined,
      sort: query.sort,
    };

    const products = await ProductRepository.getProductsWithFilters(limit, offset, filters);
    const total = await ProductRepository.getTotalProductCountWithFilters({
      status: filters.status,
      category_id: filters.category_id,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  // Get product by ID with view count increment
  static async getProductById(productId: number): Promise<ProductBasic> {
    const product = await ProductRepository.getProductDetailById(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // Increment view count asynchronously
    ProductRepository.incrementViewCount(productId).catch(err => {
      console.error('Failed to increment view count:', err);
    });

    return product;
  }

  // Create new product
  static async createProduct(data: CreateProductDTO, sellerId: number) {
    // Check if slug already exists
    const slugExists = await ProductRepository.checkSlugExists(data.slug);
    if (slugExists) {
      throw new ConflictError('Product with this slug already exists');
    }

    const product = await ProductRepository.createProduct(data, sellerId);

    return {
      message: 'Product created successfully',
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        status: product.status,
      },
    };
  }

  // Update product
  static async updateProduct(productId: number, data: UpdateProductDTO, userId: number, userRole: string) {
    const product = await ProductRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // Check if product is deleted
    if (product.deleted_at) {
      throw new NotFoundError('Product not found');
    }

    // Authorization: Only seller who owns the product or admin can update
    if (userRole !== 'admin' && product.seller_id !== userId) {
      throw new BadRequestError('You do not have permission to update this product');
    }

    // Check if slug is being changed and if it already exists
    if (data.slug && data.slug !== product.slug) {
      const slugExists = await ProductRepository.checkSlugExistsExcludingId(data.slug, productId);
      if (slugExists) {
        throw new ConflictError('Product with this slug already exists');
      }
    }

    const updatedProduct = await ProductRepository.updateProductInfo(productId, data);

    return {
      message: 'Product updated successfully',
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        price: updatedProduct.price,
        status: updatedProduct.status,
      },
    };
  }

  // Delete product (soft delete)
  static async deleteProduct(productId: number, userId: number, userRole: string) {
    const product = await ProductRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // Check if already deleted
    if (product.deleted_at) {
      throw new NotFoundError('Product not found');
    }

    // Authorization: Only seller who owns the product or admin can delete
    if (userRole !== 'admin' && product.seller_id !== userId) {
      throw new BadRequestError('You do not have permission to delete this product');
    }

    await ProductRepository.deleteProduct(productId);

    return {
      message: 'Product deleted successfully',
    };
  }
}

