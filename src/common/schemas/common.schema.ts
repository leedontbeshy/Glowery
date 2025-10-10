import { uppercase, z } from 'zod';

export const UserRoleEnum = z.enum(['user', 'seller', 'admin']);
export const UserStatusEnum = z.enum(['active', 'inactive', 'suspended']);

export const PASSWORD_REGEX = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[@$!%*?&#]/,
};

export const PHONE_REGEX = /^(0|\+84)[0-9]{9,10}$/;
export const NAME_REGEX = /^[\p{L}\s'.-]+$/u;

export const basePasswordSchema = z
  .string()
  .trim()
  .min(8, 'Password must be at least 8 characters')
  .max(50, 'Password is too long')
  .regex(PASSWORD_REGEX.uppercase, 'Must contain uppercase letter')
  .regex(PASSWORD_REGEX.lowercase, 'Must contain lowercase letter')
  .regex(PASSWORD_REGEX.number, 'Must contain number')
  .regex(PASSWORD_REGEX.special, 'Must contain special character (@$!%*?&#)');

export const baseNameSchema = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name is too long')
  .regex(NAME_REGEX, 'Name can only contain letters and spaces');

export const basePhoneSchema = z
  .string()
  .trim()
  .regex(PHONE_REGEX, 'Invalid Vietnamese phone number format');

export const tokenSchema = z.string().trim().min(1, 'Token is required');

export type UserRole = z.infer<typeof UserRoleEnum>;
export type UserStatus = z.infer<typeof UserStatusEnum>;
