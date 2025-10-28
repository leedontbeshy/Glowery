import { prisma } from "@/common/db/prisma";
import { ProductStatus } from "@/common/constants/user.enums";

import { ProductBasic } from "./product.type";
import { CreateProductDTO } from "./product.dto";

import { Product } from "./product.model";

export class ProductRepository {
  static async getAllProduct(
    limit: number = 20,
    offset: number = 0
  ): Promise<ProductBasic[]> {
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
        status: true,
      },
      take: limit,
      skip: offset,
    });

    return result.map((product) => ({
      name: product.name,
      slug: product.slug,
      description: product.description ?? undefined,
      price: product.price,
      discount_price: product.discount_price ?? undefined,
      quantity: product.quantity ?? undefined,
      sku: product.sku ?? undefined,
      view_count: product.view_count ?? undefined,
      sold_count: product.sold_count ?? undefined,
      status: product.status as ProductStatus | undefined,
    }));
  }

  static async getTotalProductCount(): Promise<number> {
    const count = prisma.products.count();
    return count;
  }

  static async getProductDetailById(
    productId: number
  ): Promise<ProductBasic | null> {
    const product = prisma.products.findUnique({
      where: { id: productId },
      select: {
        name: true,
        slug: true,
        description: true,
        price: true,
        discount_price: true,
        quantity: true,
        sku: true,
        status: true,
        view_count: true,
        sold_count: true,
      },
    });
    return product;
  }

  static async createProduct(data: CreateProductDTO): Promise<Product> {
    const product = await prisma.products.create({
      data: {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        discount_price: data.discount_price,
        quantity: data.quantity,
        sku: data.sku,
        category_id: data.category_id,
        seller_id: data.seller_id,
        status: data.status,
      },
    });
    return product;
  }
}
