import { z } from "zod";

import { ProductStatus } from "@/common/constants/user.enums";

export const productSchema = z.object({
  id: z.number().int().positive().optional(),

  name: z
    .string()
    .min(1, "Product name is required")
    .max(200, "Product name must be at most 200 characters"),

  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug must be at most 200 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),

  description: z.string().nullable().optional(),

  price: z
    .union([z.number(), z.string()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Price must be a valid positive number",
    }),

  discount_price: z
    .union([z.number(), z.string(), z.null()])
    .transform((val) => (val === null || val === undefined ? null : Number(val)))
    .refine(
      (val) => val === null || (!isNaN(val) && val >= 0),
      { message: "Discount price must be a valid positive number" }
    )
    .nullable()
    .optional(),

  quantity: z.number().int().min(0, "Quantity must be non-negative").default(0),

  sku: z.string().max(100, "SKU must be at most 100 characters").nullable().optional(),

  category_id: z.number().int().positive("Category ID must be positive").optional(),
  seller_id: z.number().int().positive("Seller ID must be positive"),

  status: z.nativeEnum(ProductStatus).default(ProductStatus.ACTIVE),

  view_count: z.number().int().min(0).default(0).optional(),
  sold_count: z.number().int().min(0).default(0).optional(),

  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().nullable().optional(),
});

// Schema cho create (bỏ các field auto-generated)
export const createProductSchema = productSchema.omit({
  id: true,
  view_count: true,
  sold_count: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
});