import { Decimal } from "@prisma/client/runtime/library";

import { ProductStatus } from "@/common/constants/user.enums";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  price: Decimal;
  discount_price?: Decimal | null;
  quantity?: number | null;
  sku?: string | null;
  category_id?: number | null;
  seller_id?: number | null;
  status: ProductStatus;
  view_count?: number | null;
  sold_count?: number | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}