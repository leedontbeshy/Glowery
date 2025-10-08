import { z } from "zod";
import {
  basePasswordSchema,
  basePhoneSchema,
  baseNameSchema,
  tokenSchema,
} from "@/common/schemas/common.schema";

export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email format"),
    password: basePasswordSchema,
    confirm_password: z.string().trim(),
    full_name: baseNameSchema,
    phone: basePhoneSchema.optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  })
  .strict();

export const createUserInput = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email format"),
    password: basePasswordSchema,
    full_name: baseNameSchema,
    phone: basePhoneSchema.optional(),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email format"),
    password: z.string().trim().min(6, "Password must be at least 6 characters"),
  })
  .strict();

export const resetPasswordRequestSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email format"),
  })
  .strict();

export const resetPasswordSchema = z
  .object({
    token: tokenSchema,
    new_password: basePasswordSchema,
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  })
  .strict();

export const changePasswordSchema = z
  .object({
    old_password: z.string().trim().min(1, "Old password is required"),
    new_password: basePasswordSchema,
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  })
  .refine((data) => data.old_password !== data.new_password, {
    message: "New password must be different from old password",
    path: ["new_password"],
  })
  .strict();

export const verifyEmailSchema = z
  .object({
    token: tokenSchema,
  })
  .strict();

// Types
export type CreateUserInput = z.infer<typeof createUserInput>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPasswordRequestInput = z.infer<typeof resetPasswordRequestSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
