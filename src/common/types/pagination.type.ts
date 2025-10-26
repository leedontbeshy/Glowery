import { UserBasic } from "@/features/users/user.type";
import { ProductBasic } from "@/features/products/product.type";
export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    usersPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;

}

export interface PaginatedUsers{
    users: UserBasic[];
    pagination: PaginationInfo;
}

export interface ProductPaginationInfo {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    productsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginatedProducts{
    products: ProductBasic[],
    pagination: ProductPaginationInfo
}