import { PaginatedProducts } from "@/common/types/pagination.type";
import { BadRequestError, NotFoundError } from "@/common/errors/ApiError";

import { ProductRepository } from "./product.repository";
import { ProductBasic } from "./product.type";
import { CreateProductDTO } from "./product.dto";
import { Product } from "./product.model";

export class ProductService {
    static async getAllProduct(queryParams: any): Promise<PaginatedProducts> {
        const page = Math.max(1, parseInt(queryParams.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(queryParams.limit) || 20));

        const offset = (page - 1) * limit;

        const [products, totalProducts] = await Promise.all([
            ProductRepository.getAllProduct(limit, offset),
            ProductRepository.getTotalProductCount()
        ]);

        const totalPages = Math.ceil(totalProducts / limit);
        
        return {
            products,
            pagination: {
                currentPage: page,
                totalPages,
                totalProducts,
                productsPerPage: limit,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            }
        };
    }

    static async getProductDetailById(productId: number):Promise<ProductBasic>{
        const product = await ProductRepository.getProductDetailById(productId);
        if(!product) throw new NotFoundError('Product does not exist');
        return product;
    }

    static async createProduct(productData: CreateProductDTO): Promise<Product> {
        // Data already validated by middleware
        
        // Business logic validation: Check slug uniqueness
        const slugExists = await ProductRepository.checkSlugExists(productData.slug);
        if (slugExists) {
            throw new BadRequestError(`Product with slug "${productData.slug}" already exists`);
        }

        // Business logic validation: Validate discount price
        if (productData.discount_price && productData.discount_price >= productData.price) {
            throw new BadRequestError("Discount price must be less than regular price");
        }

        const product = await ProductRepository.createProduct(productData);
        return product;
    }
}