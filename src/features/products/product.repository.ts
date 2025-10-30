import { Decimal } from "@prisma/client/runtime/library";

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
      status: product.status as ProductStatus,
    }));
  }

  static async getTotalProductCount(): Promise<number> {
    return prisma.products.count();
  }

  static async getProductDetailById(
    productId: number
  ): Promise<ProductBasic | null> {
    const product = await prisma.products.findUnique({
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

    if (!product) return null;

    return {
      name: product.name,
      slug: product.slug,
      description: product.description ?? undefined,
      price: product.price,
      discount_price: product.discount_price ?? undefined,
      quantity: product.quantity ?? undefined,
      sku: product.sku ?? undefined,
      status: product.status as ProductStatus,
      view_count: product.view_count ?? undefined,
      sold_count: product.sold_count ?? undefined,
    };
  }

  static async createProduct(data: CreateProductDTO, sellerId: number): Promise<Product> {
    const product = await prisma.products.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description ?? null,
        price: new Decimal(data.price),
        discount_price: data.discount_price ? new Decimal(data.discount_price) : null,
        quantity: data.quantity ?? 0,
        sku: data.sku ?? null,
        category_id: data.category_id ?? null,
        seller_id: sellerId,
        status: data.status,
      },
    });
    return product as Product;
  }

  static async checkSlugExists(slug: string): Promise<boolean> {
    const count = await prisma.products.count({
      where: { slug },
    });
    return count > 0;
  };

  static async findProductById(productId: number){
    const result = await prisma.products.findUnique({
      where:{id: productId}
    });
    return result;
  }


  static async updateProductInfo(productId: number, data: any) {
    const updateData: any = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.price !== undefined) updateData.price = new Decimal(data.price);
    if (data.discount_price !== undefined) {
      updateData.discount_price = data.discount_price ? new Decimal(data.discount_price) : null;
    }
    if (data.quantity !== undefined) updateData.quantity = data.quantity;
    if (data.sku !== undefined) updateData.sku = data.sku;
    if (data.category_id !== undefined) updateData.category_id = data.category_id;
    if (data.status !== undefined) updateData.status = data.status;

    updateData.updated_at = new Date();

    const product = await prisma.products.update({
      where: { id: productId },
      data: updateData,
    });

    return product as Product;
  }

  static async deleteProduct(productId: number) {
    // Soft delete
    const product = await prisma.products.update({
      where: { id: productId },
      data: {
        deleted_at: new Date(),
        status: 'inactive',
      },
    });
    return product;
  }

  static async getProductsWithFilters(
    limit: number,
    offset: number,
    filters?: {
      status?: string;
      category_id?: number;
      sort?: string;
    }
  ): Promise<ProductBasic[]> {
    const where: any = {
      deleted_at: null,
    };

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.category_id) {
      where.category_id = filters.category_id;
    }

    let orderBy: any = { created_at: 'desc' };

    if (filters?.sort) {
      switch (filters.sort) {
        case 'price_asc':
          orderBy = { price: 'asc' };
          break;
        case 'price_desc':
          orderBy = { price: 'desc' };
          break;
        case 'newest':
          orderBy = { created_at: 'desc' };
          break;
        case 'popular':
          orderBy = { view_count: 'desc' };
          break;
        case 'best_selling':
          orderBy = { sold_count: 'desc' };
          break;
      }
    }

    const result = await prisma.products.findMany({
      where,
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
      orderBy,
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
      status: product.status as ProductStatus,
    }));
  }

  static async getTotalProductCountWithFilters(filters?: {
    status?: string;
    category_id?: number;
  }): Promise<number> {
    const where: any = {
      deleted_at: null,
    };

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.category_id) {
      where.category_id = filters.category_id;
    }

    return prisma.products.count({ where });
  }

  static async incrementViewCount(productId: number) {
    await prisma.products.update({
      where: { id: productId },
      data: {
        view_count: {
          increment: 1,
        },
      },
    });
  }

  static async checkSlugExistsExcludingId(slug: string, productId: number): Promise<boolean> {
    const count = await prisma.products.count({
      where: {
        slug,
        id: { not: productId },
      },
    });
    return count > 0;
  }
}

