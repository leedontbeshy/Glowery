import { Decimal } from "@prisma/client/runtime/library";

import { product_status } from "generated/prisma";

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
  status?: product_status | null;
  view_count?: number | null;
  sold_count?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
