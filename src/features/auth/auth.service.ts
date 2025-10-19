import { hashPassword, verifyPassword } from '@/common/utils/hash';
import { signAccessToken,signRefreshToken } from '@/common/utils/jwt';
import { registerSchema, loginSchema } from '@/features/users/user.schema';
import { UserRepository } from '@/features/users/user.repository';
import { basePasswordSchema } from '@/common/schemas/common.schema';
import { sendResetPasswordEmail } from '@/common/utils/email';

import { TokenRepository } from './token/token.repository';
import { ResetTokenService } from './token/token.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

export class AuthService {
    static async register(data: RegisterDTO) {
        const parsed = registerSchema.safeParse(data);
        if (!parsed.success) {
            throw new Error(parsed.error.issues[0].message);
        }

        const { email, password, username, full_name, phone, address } = parsed.data;

        const existing = await UserRepository.findUserByEmail(email);
        if (existing) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await hashPassword(password);

        const user = await UserRepository.create({
            email,
            username,
            password: hashedPassword,
            full_name,
            address,
            phone,
        });

        return user;
    }

    static async login(data: LoginDTO) {
        //Validate input
        const parsed = loginSchema.safeParse(data);
        if (!parsed.success) {
            throw new Error(parsed.error.issues[0].message);
        }

        //Tim user
        const { email, password } = parsed.data;

        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('Email does not exsit');
        }

        //So sanh pass
        const match = await verifyPassword(password, user.password);
        if (!match) {
            throw new Error('Wrong Password');
        }

        await UserRepository.updateLastLogin(user.id);

        const accessToken = signAccessToken(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_ACCESS_EXPIRES_IN as string,
        );

        const refreshToken = signRefreshToken(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_REFRESH_EXPIRES_IN as string
        );

        await TokenRepository.addRefreshTokenToDB(refreshToken, user.id);
        return {
            message: 'Login Sucessfully',
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                status: user.status,
                address: user.address,
            },
        };
    }

    static async logout(accesToken: string,refreshToken: string, user_id: number) {
        await TokenRepository.addToBlackList(accesToken,refreshToken, user_id);
    };

    static async forgotPassword(email: string): Promise<any> {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            return {
                success: true,
                message:
                    'If the email exists in the system, you will receive an email with instructions to reset your password.',
            };
        }

        const hasOldToken = await TokenRepository.checkResetToken(email);
        if (hasOldToken) {
            await TokenRepository.deleteExistedToken(email);
        }
        const data = await ResetTokenService.createNewResetToken();

        await TokenRepository.createResetToken(email, data.resetToken, data.expiresAt);

        await sendResetPasswordEmail(email, data.resetToken);

        
        return data;
    }

    static async resetPassword(resetToken: string, newPassword: string) {
        const parsed = basePasswordSchema.safeParse(newPassword);
        if (!parsed.success) {
            throw new Error(parsed.error.issues[0].message);
        }
        const data = await TokenRepository.findValidToken(resetToken);
        if (!data) {
            throw new Error('Invalid or expired reset token');
        }
        const hashedPassword = await hashPassword(newPassword);
        await UserRepository.updatePasswordById(data.id, hashedPassword);
        await TokenRepository.deleteExistedToken(data.email);
        return {
            success: true,
            message: 'Password has been reset successfully.',
        };
    }
}
