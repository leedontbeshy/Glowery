import { PaginatedProducts } from "@/common/types/pagination.type";

import { ProductRepository } from "./product.repository";

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
    }
}