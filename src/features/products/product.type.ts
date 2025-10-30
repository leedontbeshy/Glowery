import { Decimal } from "@prisma/client/runtime/library";

import { ProductStatus } from "@/common/constants/user.enums";

export interface ProductBasic {
  name: string;
  slug: string;
  description?: string;
  price: Decimal;
  discount_price?: Decimal;
  quantity?: number;
  sku?: string;
  status: ProductStatus;
  view_count?: number;
  sold_count?: number;
}

export interface ProductDetail extends ProductBasic {
  id: number;
  category_id?: number;
  seller_id?: number;
  created_at: Date;
  updated_at: Date;
  images?: ProductImage[];
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  seller?: {
    id: number;
    full_name: string;
  };
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductListResponse {
  products: ProductBasic[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

