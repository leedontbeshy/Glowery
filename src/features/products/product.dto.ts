import { z } from "zod";

import {
  createProductSchema,
  updateProductSchema,
  getProductsQuerySchema
} from "./product.schema";

export type CreateProductDTO = z.infer<typeof createProductSchema>['body'];
export type UpdateProductDTO = z.infer<typeof updateProductSchema>['body'];
export type GetProductsQueryDTO = z.infer<typeof getProductsQuerySchema>['query'];

