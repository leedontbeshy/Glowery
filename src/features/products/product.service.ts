import { PaginatedProducts } from "@/common/types/pagination.type";
import { NotFoundError } from "@/common/errors/ApiError";

import { ProductRepository } from "./product.repository";
import { ProductBasic } from "./product.type";


export class ProductService{
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


    
}