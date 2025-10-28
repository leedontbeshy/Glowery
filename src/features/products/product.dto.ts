import z from "zod";

import { productSchema } from "./product.schema";

export type CreateProductDTO = z.infer<typeof productSchema>;