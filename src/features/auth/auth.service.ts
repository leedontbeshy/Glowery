import { hashPassword, verifyPassword } from '@/common/utils/hash';
import { signAccessToken,signRefreshToken, verifyRefreshToken } from '@/common/utils/jwt';
import { UserRepository } from '@/features/users/user.repository';
import { sendResetPasswordEmail } from '@/common/utils/email';
import { ConflictError, NotFoundError, UnauthorizedError } from '@/common/errors/ApiError';

import { TokenRepository } from './token/token.repository';
import { ResetTokenService } from './token/token.service';
import { LoginDTO, RegisterDTO, RefreshTokenDTO } from './auth.dto';


export class AuthService {
    static async register(data: RegisterDTO):Promise<void> {
        const { email, password, username, full_name, phone, address } = data;

        // Business logic validation: Check if email exists
        const existing = await UserRepository.findUserByEmail(email);
        if (existing) {
            throw new ConflictError('Email already exists');
        }

        const hashedPassword = await hashPassword(password);

        await UserRepository.create({
            email,
            username,
            password: hashedPassword,
            full_name,
            address,
            phone,
        });

    }

    static async login(data: LoginDTO) {
        const { email, password } = data;

        // Find user
        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            throw new NotFoundError('Email does not exsit');
        }

        // Verify password
        const match = await verifyPassword(password, user.password);
        if (!match) {
            throw new UnauthorizedError('Wrong Password');
        }

        await UserRepository.updateLastLogin(user.id);

        const accessToken = signAccessToken(
            {
                id: user.id,
                email: user.email,
                role: user.role!,
            },
            process.env.JWT_ACCESS_EXPIRES_IN as string,
        );

        const refreshToken = signRefreshToken(
            {
                id: user.id,
                email: user.email,
                role: user.role!,
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

    static async forgotPassword(email: string) {
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
            await TokenRepository.deleteExistedResetToken(email);
        }
        const data = await ResetTokenService.createNewResetToken(); //generate resettoken

        await TokenRepository.createResetToken(email, data.resetToken, data.expiresAt, user.id); //add to db

        await sendResetPasswordEmail(email, data.resetToken);

        return data;
    }

    static async resetPassword(resetToken: string, newPassword: string) {
        const data = await TokenRepository.findValidResetToken(resetToken);
        if (!data) {
            throw new UnauthorizedError('Invalid or expired reset token');
        }
        
        const hashedPassword = await hashPassword(newPassword);
        await UserRepository.updatePasswordById(data.id, hashedPassword);
        await TokenRepository.deleteExistedResetToken(data.email);
    }

    static async refreshAccessToken(data: RefreshTokenDTO): Promise<{ accessToken: string }> {
        const { refresh_token } = data;

        // Verify token signature and expiration
        let decoded;
        try {
            decoded = verifyRefreshToken(refresh_token);
        } catch {
            throw new UnauthorizedError('Invalid or expired refresh token (signature verification failed)');
        }

        // Check if token exists in database
        const tokenRecord = await TokenRepository.findRefreshTokenRecord(refresh_token);
        if (!tokenRecord) {
            throw new UnauthorizedError('Refresh token not found in database');
        }

        // Check if token is revoked
        if (tokenRecord.is_revoked) {
            throw new UnauthorizedError('Refresh token has been revoked');
        }

        // Check if token is expired
        if (new Date() > tokenRecord.expires_at) {
            throw new UnauthorizedError('Refresh token has expired');
        }

        // Check if token is blacklisted
        const isBlacklisted = await TokenRepository.isBlacklisted(refresh_token);
        if (isBlacklisted) {
            throw new UnauthorizedError('Refresh token is blacklisted');
        }

        // Generate new access token
        const newAccessToken = signAccessToken(
            {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
            },
            process.env.JWT_ACCESS_EXPIRES_IN as string,
        );

        return { accessToken: newAccessToken };
    }

}
