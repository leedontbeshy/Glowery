import { z } from "zod";


// Product status enum schema
export const ProductStatusEnum = z.enum(['active', 'inactive', 'out_of_stock']);

// Create product schema
export const createProductSchema = z.object({
  body: z.object({
    name: z.string()
      .min(3, 'Product name must be at least 3 characters')
      .max(200, 'Product name is too long'),
    slug: z.string()
      .min(3, 'Slug must be at least 3 characters')
      .max(200, 'Slug is too long')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
    description: z.string().optional(),
    price: z.number()
      .positive('Price must be positive')
      .max(999999999.99, 'Price is too large'),
    discount_price: z.number()
      .positive('Discount price must be positive')
      .max(999999999.99, 'Discount price is too large')
      .optional(),
    quantity: z.number()
      .int('Quantity must be an integer')
      .min(0, 'Quantity cannot be negative')
      .optional(),
    sku: z.string()
      .max(100, 'SKU is too long')
      .optional(),
    category_id: z.number()
      .int('Category ID must be an integer')
      .positive('Category ID must be positive')
      .optional(),
    status: ProductStatusEnum.default('active'),
  }).refine((data) => {
    if (data.discount_price && data.discount_price >= data.price) {
      return false;
    }
    return true;
  }, {
    message: 'Discount price must be less than regular price',
    path: ['discount_price'],
  }),
});

// Update product schema
export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Product ID must be a number'),
  }),
  body: z.object({
    name: z.string()
      .min(3, 'Product name must be at least 3 characters')
      .max(200, 'Product name is too long')
      .optional(),
    slug: z.string()
      .min(3, 'Slug must be at least 3 characters')
      .max(200, 'Slug is too long')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens')
      .optional(),
    description: z.string().optional(),
    price: z.number()
      .positive('Price must be positive')
      .max(999999999.99, 'Price is too large')
      .optional(),
    discount_price: z.number()
      .positive('Discount price must be positive')
      .max(999999999.99, 'Discount price is too large')
      .optional()
      .nullable(),
    quantity: z.number()
      .int('Quantity must be an integer')
      .min(0, 'Quantity cannot be negative')
      .optional(),
    sku: z.string()
      .max(100, 'SKU is too long')
      .optional()
      .nullable(),
    category_id: z.number()
      .int('Category ID must be an integer')
      .positive('Category ID must be positive')
      .optional()
      .nullable(),
    status: ProductStatusEnum.optional(),
  }).refine((data) => {
    if (data.discount_price !== undefined && data.discount_price !== null && data.price && data.discount_price >= data.price) {
      return false;
    }
    return true;
  }, {
    message: 'Discount price must be less than regular price',
    path: ['discount_price'],
  }),
});

// Get product by ID schema
export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Product ID must be a number'),
  }),
});

// Delete product schema
export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Product ID must be a number'),
  }),
});

// Query params schema for listing products
export const getProductsQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page must be a number').optional().default('1'),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional().default('20'),
    status: ProductStatusEnum.optional(),
    category_id: z.string().regex(/^\d+$/, 'Category ID must be a number').optional(),
    sort: z.enum(['price_asc', 'price_desc', 'newest', 'popular', 'best_selling']).optional(),
  }),
});

