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

//Update User Info
export const updateUserSchema = z
    .object({
        full_name: baseNameSchema.optional(),
        phone: basePhoneSchema.optional(),
        address: baseAddressSchema.optional(),
    })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided',
    });

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

// Types

