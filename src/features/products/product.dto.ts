import { z } from "zod";

import { productSchema, createProductSchema } from "./product.schema";

export type ProductDTO = z.infer<typeof productSchema>;
export type CreateProductDTO = z.infer<typeof createProductSchema>;