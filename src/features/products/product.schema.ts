import { z } from "zod";

import { product_status } from "generated/prisma";



export const productSchema = z.object({
  id: z.number().int().positive().optional(),

  name: z
    .string()
    .nonempty("Product name is required")
    .max(200, "Product name must be at most 200 characters"),

  slug: z
    .string()
    .nonempty("Slug is required")
    .max(200, "Slug must be at most 200 characters"),

  description: z.string().nullable().optional(),

  price: z
    .union([z.number(), z.string()])
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid number",
    }),

  discount_price: z
    .union([z.number(), z.string()])
    .refine(
      (val) => val === null || val === undefined || !isNaN(Number(val)),
      { message: "Discount price must be a valid number" }
    )
    .nullable()
    .optional(),

  quantity: z.number().int().min(0, "Quantity must be non-negative").optional(),

  sku: z.string().max(100, "SKU must be at most 100 characters").nullable().optional(),

  category_id: z.number().int().positive().optional(),
  seller_id: z.number().int().positive().optional(),

  status: z.nativeEnum(product_status),

  view_count: z.number().int().min(0).optional(),
  sold_count: z.number().int().min(0).optional(),

  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().nullable().optional(),
});


