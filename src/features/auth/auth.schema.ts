import { z } from 'zod';

import {
    basePasswordSchema,
    basePhoneSchema,
    baseNameSchema,
    tokenSchema,
    baseUsernameSchema,
    baseAddressSchema,
} from '@/common/schemas/common.schema';

export const registerSchema = z
    .object({
        email: z.string().trim().toLowerCase().email('Invalid email format'),
        password: basePasswordSchema,
        username: baseUsernameSchema,
        confirm_password: z.string().trim(),
        full_name: baseNameSchema,
        phone: basePhoneSchema.optional(),
        address: baseAddressSchema,
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ['confirm_password'],
    })
    .strict();

export const createUserInput = z
    .object({
        email: z.string().trim().toLowerCase().email('Invalid email format'),
        username: baseUsernameSchema,
        password: basePasswordSchema,
        full_name: baseNameSchema,
        phone: basePhoneSchema.optional(),
        address: baseAddressSchema,
    })
    .strict();

export const loginSchema = z
    .object({
        email: z.string().trim().toLowerCase().email('Invalid email format'),
        password: z.string().trim().min(6, 'Password must be at least 6 characters'),
    })
    .strict();

export const resetPasswordRequestSchema = z
    .object({
        email: z.string().trim().toLowerCase().email('Invalid email format'),
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
        path: ['confirm_password'],
    })
    .strict();


export const verifyEmailSchema = z
    .object({
        token: tokenSchema,
    })
    .strict();

export const refreshTokenSchema = z
    .object({
        refreshToken: z.string().trim().min(1, 'Refresh token is required'),
    })
    .strict();
