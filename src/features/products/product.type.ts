import { Product } from "./product.model";

export type ProductBasic = Pick<
  Product,
  | "name"
  | "description"
  | "price"
  | "slug"
  | "sold_count"
  | "view_count"
  | "status"
  | "discount_price"
  | "quantity"
  | "sku"
>;
