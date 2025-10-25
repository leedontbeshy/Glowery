import z from "zod";

import { 
    registerSchema, 
    createUserInput, 
    loginSchema, 
    resetPasswordRequestSchema, 
    resetPasswordSchema, 
    verifyEmailSchema,
    refreshTokenSchema
} from "./auth.schema";

export type RegisterDTO = z.infer<typeof registerSchema>;
export type CreateUserDTO = z.infer<typeof createUserInput>;
export type LoginDTO = z.infer<typeof loginSchema>
export type ResetPasswordRequestDTO = z.infer<typeof resetPasswordRequestSchema>;
export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>;
export type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;