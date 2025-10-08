import {z} from 'zod';

export const UserRoleEnum = z.enum(["user", "seller", "admin"]);
export const UserStatusEnum = z.enum(['active', "inactive", "suspended"]);

export const registerSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .min(6,"Password must be at least 6 characters long")
        .max(50,"Password is too long"),
    full_name: z.string().min(2,"Your name is too short"),
    phone: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof loginSchema>;