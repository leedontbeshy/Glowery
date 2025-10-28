import { PaginatedProducts } from "@/common/types/pagination.type";
import { NotFoundError } from "@/common/errors/ApiError";

import { ProductRepository } from "./product.repository";
import { ProductBasic } from "./product.type";


export class ProductService{
    static async getAllProduct(queryParams: any):Promise<PaginatedProducts>{
        
        const { page = 1, limit = 20 } = queryParams;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const products = await ProductRepository.getAllProduct(parseInt(limit), offset);
        const totalProducts = await ProductRepository.getTotalProductCount();
                
        const totalPages = Math.ceil(totalProducts/ parseInt(limit));
        return {
            products,
            pagination:{
                currentPage: parseInt(page),
                totalPages,
                totalProducts,
                productsPerPage: parseInt(limit),
                hasNext: parseInt(page) < totalPages,
                hasPrev: parseInt(page) > 1,
            }
        }
    };

    static async getProductDetailById(productId: number):Promise<ProductBasic>{
        const product = await ProductRepository.getProductDetailById(productId);
        if(!product) throw new NotFoundError('Product does not exist');
        return product;
    }
}