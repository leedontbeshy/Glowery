import { prisma } from "@/common/db/prisma";

export class ProductRepository {
    static async getAllProduct(limit: number = 20, offset: number = 0) {
        const result = await prisma.products.findMany({
            select: {
                name: true,
                slug: true,
                description: true,
                price: true,
                discount_price: true,
                quantity: true,
                sku: true,
                view_count: true,
                sold_count: true,
            },
            take: limit,
            skip: offset
        });
        return result;
    };

    static async getTotalProductCount(): Promise<number>{
        const count = prisma.products.count();
        return count;
    };

    

}