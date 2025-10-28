import { Product } from "./product.model";


export type ProductBasic = Pick<
  Product,
  | 'name'
  | 'slug'
  | 'description'
  | 'price'
  | 'discount_price'
  | 'quantity'
  | 'sku'
  | 'status'
  | 'view_count'
  | 'sold_count'
>;